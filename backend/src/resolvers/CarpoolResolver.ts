//import { User } from "../entities/User";
import { User } from "../entities/User";
import CarpoolInput from "../Inputs/CarpoolInput";
import { Carpool } from "../entities/Carpool";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
//import { In } from "typeorm";
//import { Field, InputType } from "type-graphql";

// Define the input type for creating a carpool

@Resolver(Carpool)
class CarpoolResolver {
  @Query(() => [Carpool])
  async getCarpools() {
    return await Carpool.find();
  }

  @Mutation(() => Carpool)
  async createCarpool(@Arg("data") data: CarpoolInput): Promise<Carpool> {
    const carpool = Carpool.create({ ...data });
  
    // Assign the driver if a userId is provided
    if (data.userId) {
      const user = await User.findOne({ where: { id: data.userId } });
      if (!user) {
        throw new Error("User not found");
      }
      carpool.driver = user; // Set the driver
    }
  
    await carpool.save();
    return carpool;
  }
}

export default CarpoolResolver;
