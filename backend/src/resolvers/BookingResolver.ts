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
      relations: ["carpool", "carpool.driver", "passenger"],
    });
  }

  @Mutation(() => Booking)
  async createBooking(@Arg("data") bookingInput: BookingInput) {
    const { carpool_id, passenger_id, ...rest } = bookingInput;

    // Récupérer le carpool
    const carpool = await Carpool.findOne({ where: { id: carpool_id } });
    if (!carpool) {
      throw new Error("Carpool not found");
    }

    // Récupérer le passager
    const user = await User.findOne({ where: { id: passenger_id } });
    if (!user) {
      throw new Error("User not found");
    }

    // Création de la réservation avec les relations établies
    const newBooking = await Booking.create({
      ...rest,
      carpool, // Associer le carpool trouvé
      passenger: user, // Associer l'utilisateur trouvé
    }).save();

    return newBooking;
  }
}
