import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Booking } from "../entities/Booking";
import { BookingInput } from "../inputs/BookingInput";
import { User } from "../entities/User";

@Resolver(Booking)
export class BookingResolver {
   @Query(() => [Booking])
   async getBookings() {
      return await Booking.find({ relations: ["carpool", "carpool.driver", "passenger"] });
   }
   
   @Mutation(() => Booking)
   async createBooking(@Arg("data") newData: BookingInput) {
      const newBooking = Booking.create({
         ...newData
      })
      if (newData.passenger_id) {
         const user = await User.findOne({ where: { id: newData.passenger_id } });
         if (!user) {
            throw new Error("User not found");
         }
         newBooking.passenger = user;
      }
      const bookingToSave = await newBooking.save();
      return bookingToSave;
   }
}
