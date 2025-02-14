import { InputType, Field } from "type-graphql";
import { IsDateString, IsString, IsInt, Min } from "class-validator";

@InputType()
export class BookingInput {
  @Field()
  @IsString()
  status: string;

  @Field()
  @IsDateString()
  booking_date: Date;

  @Field()
  @IsInt()
  @Min(1)
  num_passenger: number;

  @Field()
  carpoolId: number;

  @Field()
  userId: number;
}
