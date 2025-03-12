import { Carpool } from "../entities/Carpool";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CarpoolInput from "../inputs/CarpoolInput";
import { User } from "../entities/User";

@Resolver(Carpool)
export default class CarpoolResolver {
  @Query(() => [Carpool])
  async getCarpools() {
    return await Carpool.find({ relations: ["driver"] });
  }

  @Query(() => Carpool)
  async getCarpoolById(@Arg("id") id: number) {
    const car = await Carpool.findOne({
      where: { id: id },
      //order: { pictures: { id: "DESC" } },
      relations: ["driver"],
    });
    if (car === null) {
      throw new Error("Cannot find carpool with id " + id);
    }
    return car;
  }

  @Query(() => [Carpool])
  async searchCarpools(
    @Arg("departure", { nullable: true }) departure?: string,
    @Arg("arrival", { nullable: true }) arrival?: string,
    @Arg("date", { nullable: true }) date?: string
  ) {
    const whereClause: any = {};
    if (departure) whereClause.departure_city = departure;
    if (arrival) whereClause.arrival_city = arrival;
    if (date) whereClause.departure_date = date;
  
    return await Carpool.find({ where: whereClause, relations: ["driver"] });
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
