import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Booking } from "../entities/booking";
import { BookingInput } from "../Inputs/bookingInput";
import { Carpool } from "../entities/Carpool";
import { User } from "../entities/User";

@Resolver()
export class BookingResolver {
  // Fetch all bookings
  @Query(() => [Booking])
  async bookings(): Promise<Booking[]> {
    return Booking.find();
  }

  // Create a booking
  @Mutation(() => Booking)
  async createBooking(
    @Arg("data") data: BookingInput
  ): Promise<Booking> {
    const booking = new Booking();
    booking.status = data.status;
    booking.booking_date = data.booking_date;
    booking.num_passenger = data.num_passenger;
    
    const carpool = await Carpool.findOne({ where: { id: data.carpoolId } });
    const user = await User.findOne({ where: { id: data.userId } });
    
    if (!carpool || !user) {
      throw new Error("Carpool or User not found");
    }

    booking.carpool = carpool;
    booking.passenger = user;

    return booking.save();
  }
}
