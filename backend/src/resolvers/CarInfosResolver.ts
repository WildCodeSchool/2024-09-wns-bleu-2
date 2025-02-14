import { Resolver, Query } from "type-graphql";
import { CarInfos } from "../entities/CarInfos";

@Resolver()
export class CarInfosResolver {
  @Query(() => [CarInfos])
  async getCarInfos() {
    const carBrands = await CarInfos.find();
    console.log("CarBrands:", carBrands);
    return carBrands;
  }
}
