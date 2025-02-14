import { Field, InputType } from "type-graphql";
import { CarInfos } from "../entities/CarInfos";

@InputType()
export default class CarInfosInput implements Partial<CarInfos> {
  @Field()
  model: string;

  @Field()
  year: number;

  @Field()
  color: string;

  @Field()
  brand: string;
}
