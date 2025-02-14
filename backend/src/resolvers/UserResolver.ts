//import { Carpool } from "../entities/Carpool";
import { UserInput } from "../Inputs/UserInput";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
//import { In } from "typeorm";

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  @Mutation(() => String)
  async register(@Arg("data") newUserData: UserInput) {
    const result = await User.save({
      email: newUserData.email,
      password: await argon2.hash(newUserData.password),
      firstname: newUserData.firstname,
      lastname: newUserData.lastname,
      birthdate: newUserData.birthdate,
      gender: newUserData.gender,
      phone: newUserData.phone,
      avatar: newUserData.avatar,
    });
    console.log("result", result);
    return "The user was created";
  }

  
}

export default UserResolver;
