import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { UserInput } from "../inputs/UserInput";
import { CarInfos } from "../entities/CarInfos";

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

  @Mutation(() => User)
  async setUserCar(
    @Arg("userId") userId: number,
    @Arg("carId") carId: number
  ): Promise<User> {
    const user = await User.findOne({
      where: { id: userId },
      relations: ["car"],
    });
    if (!user) throw new Error("User not found");

    const car = await CarInfos.findOne({ where: { id: carId } });
    if (!car) throw new Error("Car model not found");

    user.car = car;
    await user.save();
    return user;
  }

  @Query(() => [User])
  async getAllUsers() {
    return await User.find({ relations: ["carpools"] });
  }
}
