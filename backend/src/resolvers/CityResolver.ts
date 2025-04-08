import { Query, Resolver } from "type-graphql";
import { City } from "../entities/City";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getCities(): Promise<City[]> {
    return await City.find();
  }
}
