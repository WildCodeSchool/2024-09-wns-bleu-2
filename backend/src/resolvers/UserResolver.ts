import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver(User)
export class UserResolver {
  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const result = await User.save({
      email: newUserData.email,
      password: await argon2.hash(newUserData.password),
      firstname: newUserData.firstname,
      lastname: newUserData.lastname,
      birthdate: newUserData.birthDate,
      gender: newUserData.gender,
      phone: newUserData.phone,
      avatar: newUserData.avatar,
    });
    console.log("result", result);
    return "The user was created";
  }

  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }
}
