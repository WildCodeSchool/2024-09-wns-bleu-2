import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Booking } from "../entities/Booking";
import { Carpool } from "../entities/Carpool";
import { BookingInput } from "../inputs/BookingInput";
import { User } from "../entities/User";

@Resolver(Booking)
export class BookingResolver {
  @Query(() => [Booking])
  async getBookings() {
    return await Booking.find({
      relations: ["carpool", "carpool.driver", "driver"],
    });
  }

  @Query(() => [Booking])
  async getBookingsByUserId(@Arg("userId") userId: number) { //async getMyBookings(@Ctx() { user }: MyContext)
    return await Booking.find({
      where: {
        driver: { id: userId }
      },
      relations: [
        "carpool",
        "carpool.driver",
        "driver"
      ]
    });
  }

  @Mutation(() => Booking)
  async createBooking(@Arg("data") bookingInput: BookingInput) {
    const { carpool_id, driver_id, ...rest } = bookingInput;

    // Récupérer le carpool
    const carpool = await Carpool.findOne({ where: { id: carpool_id } });
    if (!carpool) {
      throw new Error("Carpool not found");
    }

    // Récupérer le passager
    const user = await User.findOne({ where: { id: driver_id } });
    if (!user) {
      throw new Error("User not found");
    }

    // Création de la réservation avec les relations établies
    const newBooking = await Booking.create({
      ...rest,
      carpool, // Associer le carpool trouvé
      driver: user, // Associer l'utilisateur trouvé
    }).save();

    return newBooking;
  }
}