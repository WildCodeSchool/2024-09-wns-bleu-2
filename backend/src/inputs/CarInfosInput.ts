import { InputType, Field } from "type-graphql";

@InputType()
export class CarInfosInput {
  @Field({ nullable: true })
  year?: number;

  @Field({ nullable: true })
  color?: string;

  @Field()
  brand: string;
}
