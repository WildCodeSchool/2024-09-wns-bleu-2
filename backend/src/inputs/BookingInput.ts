import { Booking } from "../entities/Booking";
import { Field, InputType } from "type-graphql";

@InputType()
export class BookingInput implements Partial<Booking> {
   @Field()
   numPassenger: number;

   @Field()
   reservedAt: Date;

   @Field()
   carpool_id: number;

   @Field()
   passenger_id: number;
}