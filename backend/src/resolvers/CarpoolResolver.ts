import { Carpool } from "../entities/Carpool";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import CarpoolInput from "../inputs/CarpoolInput";
import { User } from "../entities/User";
import { City } from "../entities/City";
import { getTripInfos } from "../utils/geopify";

@Resolver(Carpool)
export default class CarpoolResolver {
  @Query(() => [Carpool])
  async getCarpools() {
    return await Carpool.find({
      relations: [
        "driver",
        "bookings",
        "bookings.passenger",
        "bookings.carpool",
      ],
    });
  }
  @Query(() => Carpool)
  async getCarpoolById(@Arg("id") id: number) {
    return await Carpool.findOne({
      where: { id },
      relations: ["driver", "bookings", "bookings.passenger"],
    });
  }

  @Query(() => [Carpool])
  async getCarpoolsByUserId(@Arg("userId") userId: number) {
    return await Carpool.find({
      where: { driver: { id: userId } }, // Get carpools where the user is the driver
      relations: ["driver", "bookings", "bookings.passenger"], // Fetch related entities
    });
  }

  @Mutation(() => String)
  async deleteCarpool(@Arg("id") id: number) {
    const result = await Carpool.delete(id);
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "Carpool has been deleted";
    } else {
      throw new Error("Carpool has not been found");
    }
  }

  @Query(() => [Carpool])
  async searchCarpools(
    @Arg("departure", { nullable: true }) departure?: string,
    @Arg("arrival", { nullable: true }) arrival?: string,
    @Arg("date", { nullable: true }) date?: string,
    @Arg("time", { nullable: true }) time?: string
  ): Promise<Carpool[]> {
    const DEFAULT_KM = 10; // Recherche 10km par défaut autour de la ville demandée

    // requête dynamique au lieu de 'find()'
    const query = Carpool.createQueryBuilder("carpool").leftJoinAndSelect(
      "carpool.driver",
      "driver"
    ); // On récupère les infos du conducteur en même temps

    if (departure) {
      query.andWhere("LOWER(carpool.departure_city) LIKE LOWER(:departure)", {
        // LOWER et LIKE LOWER : l'utilisateur peut taper en majuscule ou minuscule
        departure: `%${departure}%`, // Recherche avec ('%mot%') pour trouver "Paris" avec "Par"
      });
    }

    if (arrival) {
      // On récupère la ville d'arrivée pour appliquer le filtrage par défaut
      const arrivalCity = await City.findOne({ where: { name: arrival } });
      if (arrivalCity) {
        // Trouver toutes les villes dans un rayon de DEFAULT_KM km
        const nearbyCities = await City.createQueryBuilder("city")
          .where(
            "ST_DWithin(city.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)",
            {
              lng: arrivalCity.location.coordinates[0],
              lat: arrivalCity.location.coordinates[1],
              radius: DEFAULT_KM * 1000, // convertir km en mètres
            }
          )
          .getMany();

        const cityNames = nearbyCities.map((city) => city.name);

        query.andWhere("carpool.arrival_city IN (:...cityNames)", {
          cityNames,
        });
      } else {
        // Si la ville n'existe pas, on ne retourne rien
        return [];
      }
    }

    if (date) {
      query.andWhere("carpool.departure_date = :date", { date });
    }

    if (time) {
      query.andWhere("carpool.departure_time >= :time", { time });
    }
    return await query.getMany(); // `getMany()` retourne un tableau contenant tous les trajets trouvés.
  }

  @Mutation(() => Carpool)
  async createCarpool(@Arg("data") data: CarpoolInput): Promise<Carpool> {
    const toll = data.options?.includes("Autoroute") || false;

    const filteredOptions = data.options?.filter((o) => o != "Autoroute");

    const departureCity = await City.findOne({
      where: { name: data.departure_city },
    });
    const arrivalCity = await City.findOne({
      where: { name: data.arrival_city },
    });

    if (!departureCity || !arrivalCity) {
      throw new Error("Ville de départ ou d'arrivée introuvable");
    }

    // Calcul via Geoapify
    const tripInfo = await getTripInfos(
      departureCity.location.coordinates as [number, number],
      arrivalCity.location.coordinates as [number, number],
      data.departure_time,
      toll
    );

    const carpool = Carpool.create({
      ...data,
      toll,
      options: filteredOptions,
      duration: tripInfo.duration,
      arrival_time: tripInfo.arrival,
    });
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
