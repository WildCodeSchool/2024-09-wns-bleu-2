import { Field, ID, InputType } from "type-graphql";
import { Options } from "../entities/Carpool";
import { Carpool } from "../entities/Carpool";
import { User } from "../entities/User";

@InputType()
export default class CarpoolInput implements Partial<Carpool> {
  @Field()
  departure_date: Date;

  @Field()
  departure_city: string;

  @Field()
  departure_time: Date;

  @Field()
  arrival_city: string;

  @Field()
  num_passenger: number;

  @Field()
  type_of_road: string;

  @Field()
  duration: number;

  @Field()
  price: number;

  @Field()
  options: Options;

  @Field(() => ID)
  driver_id: User;
}
