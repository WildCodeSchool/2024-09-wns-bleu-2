import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Booking } from "../entities/Booking";
import { Carpool } from "../entities/Carpool";
import { BookingInput } from "../inputs/BookingInput";
import { User } from "../entities/User";

@Resolver(Booking)
export class BookingResolver {
  @Query(() => [Booking])
  async getBookings(@Ctx() context: any) {
    if (context && context.email) {
      return await Booking.find({
        relations: ["carpool", "carpool.driver", "passenger"],
      });
    } else {
      throw new Error("Unauthorized");
    }
  }

  @Query(() => [Booking])
  async getBookingsForPassenger(@Arg("passengerId") passengerId: number, @Ctx() context: any) {
    // return await Booking.find({
    //   where: { passenger: { id: passengerId } },
    //   relations: ["carpool", "carpool.driver", "passenger"],
    // });
    if (!context.email) {
      throw new Error("Unauthorized. Please log in to access bookings.");
    }

    const user = await User.findOneBy({ email: context.email });
    if (!user || user.id !== passengerId) {
      throw new Error("Forbidden. You can only access your own bookings.");
    }

    return await Booking.find({
      where: { passenger: { id: passengerId } },
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

  @Mutation(() => String)
  async deleteBooking(
  //   @Arg("passengerId") passengerId: number,
  //   @Arg("carpoolId") carpoolId: number
  // ) {
    // const booking = await Booking.findOne({
    //   where: { passenger: { id: passengerId }, carpool: { id: carpoolId } },
    // });

    // if (!booking) {
    //   throw new Error("Booking not found");
    // }

    // await Booking.remove(booking);
    // return "Booking deleted successfully";
    @Arg("passengerId") passengerId: number,
    @Arg("carpoolId") carpoolId: number,
    @Ctx() context: any
  ){
    if (!context.email) {
      throw new Error("Unauthorized. Please log in to delete a booking.");
    }

    const user = await User.findOneBy({ email: context.email });
    if (!user || user.id !== passengerId) {
      throw new Error("Forbidden. You can only delete your own bookings.");
    }

    const booking = await Booking.findOne({
      where: { passenger: { id: passengerId }, carpool: { id: carpoolId } },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    await Booking.remove(booking);
    return "Booking deleted successfully";
  }
}
