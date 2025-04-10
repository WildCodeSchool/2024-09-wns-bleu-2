import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CarInfos } from "../entities/CarInfos";
import { CarInfosInput } from "../inputs/CarInfosInput";

import brands from "../data/brands.json";
import colors from "../data/colors.json";
import years from "../data/years.json";

@Resolver()
export class CarInfosResolver {
  @Query(() => [String])
  getCarBrands(): string[] {
    return brands.map((item) => item.brand);
  }

  @Query(() => [String])
  getCarColors(): string[] {
    return colors.map((item) => item.color);
  }

  @Query(() => [Number])
  getCarYears(): number[] {
    return years.map((item) => item.year);
  }

  @Mutation(() => CarInfos)
  async createCarInfos(@Arg("data") data: CarInfosInput): Promise<CarInfos> {
    const car = CarInfos.create({
      brand: data.brand,
      color: data.color,
      year: data.year,
    });

    await car.save();
    return car;
  }
}
