import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";
import { Gender } from "../entities/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  birthdate: Date;

  @Field()
  gender: Gender;

  @Field()
  phone: string;

  @Field()
  avatar: string;

  /*
  @OneToOne(() => CarInfos, (carInfos) => carInfos.user, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  carInfos: CarInfos; */
}