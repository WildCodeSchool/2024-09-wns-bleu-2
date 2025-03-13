import { Carpool } from "../entities/Carpool";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CarpoolInput from "../inputs/CarpoolInput";
import { User } from "../entities/User";

@Resolver(Carpool)
export default class CarpoolResolver {
  @Query(() => [Carpool])
  async getCarpools() {
    return await Carpool.find({ relations: ["driver", "bookings"] });
  }
  @Query(() => Carpool)
  async getCarpoolById(@Arg("id") id: number) {
    return await Carpool.findOne({
      where: { id },
      relations: ["driver", "bookings"],
    });
  }

  @Mutation(() => Carpool)
  async createCarpool(@Arg("data") data: CarpoolInput): Promise<Carpool> {
    const carpool = Carpool.create({ ...data });

    // If a user ID is provided, assign the user to the carpool
    if (data.driver_id) {
      const user = await User.findOne({ where: { id: data.driver_id } });
      if (!user) {
        throw new Error("User not found");
      }
      carpool.driver = user;
    }

    await carpool.save();
    return carpool;
  }
}
