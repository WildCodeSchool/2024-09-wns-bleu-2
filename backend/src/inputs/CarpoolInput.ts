import { Field, InputType } from "type-graphql";
import { Options } from "../entities/Carpool";
import { Carpool } from "../entities/Carpool";

@InputType()
export default class CarpoolInput implements Partial<Carpool> {
  @Field()
  departure_date: string;

  @Field()
  departure_city: string;

  @Field()
  departure_time: string;

  @Field()
  arrival_time: string;

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

  @Field()
  driver_id: number;
}
