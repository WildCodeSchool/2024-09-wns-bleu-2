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
    @Arg("time", { nullable: true }) time?: string,
    @Arg("radiusKm", { nullable: true }) radiusKm?: number
  ): Promise<Carpool[]> {
    const DEFAULT_KM = 10; // Recherche 10km par défaut autour de la ville demandée
    const radius = radiusKm ?? DEFAULT_KM; // Comme ça, si l'utilisateur n'a rien mis, il y aura 10km par défaut

    console.log("🔎 searchCarpools called with:", {
      departure,
      arrival,
      date,
      time,
      radiusKm,
      radius,
    });

    // requête dynamique au lieu de 'find()'
    const query = Carpool.createQueryBuilder("carpool").leftJoinAndSelect(
      "carpool.driver",
      "driver"
    ); // On récupère les infos du conducteur en même temps

    // --- Filtrage sur la ville de départ ---
    if (departure) {
      // On cherche la ville exacte dans la table City (par nom, insensible à la casse)
      const departureCity = await City.createQueryBuilder("city")
        .where("LOWER(city.name) LIKE LOWER(:name)", { name: `%${departure}%` })
        .getOne();

      if (departureCity && departureCity.location) {
        console.log("📍 departureCity found:", departureCity);

        // Trouver toutes les villes dans un rayon de X km autour de la ville demandée
        const nearbyDepartureCities = await City.createQueryBuilder("city")
          .where(
            "ST_DWithin(city.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)",
            {
              lng: departureCity.location.coordinates[0],
              lat: departureCity.location.coordinates[1],
              radius: radius * 1000, // convertir km en mètres
            }
          )
          .getMany();

        const departureNames = nearbyDepartureCities.map((city) => city.name);

        // On ne garde que les trajets dont la ville de départ est dans ce rayon
        if (departureNames.length) {
          query.andWhere("carpool.departure_city IN (:...departureNames)", {
            departureNames,
          });
        }
      } else {
        // Si la ville n'existe pas en base City, on filtre uniquement par LIKE
        query.andWhere("LOWER(carpool.departure_city) LIKE LOWER(:departure)", {
          departure: `%${departure}%`,
        });
      }
    }

    // --- Filtrage sur la ville d'arrivée ---
    if (arrival) {
      // On cherche la ville exacte dans la table City (par nom, insensible à la casse)
      const arrivalCity = await City.createQueryBuilder("city")
        .where("LOWER(city.name) LIKE LOWER(:name)", { name: `%${arrival}%` })
        .getOne();

      if (arrivalCity && arrivalCity.location) {
        console.log("📍 arrivalCity found:", arrivalCity);

        // Trouver toutes les villes dans un rayon de X km autour de la ville demandée
        const nearbyArrivalCities = await City.createQueryBuilder("city")
          .where(
            "ST_DWithin(city.location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)",
            {
              lng: arrivalCity.location.coordinates[0],
              lat: arrivalCity.location.coordinates[1],
              radius: radius * 1000, // convertir km en mètres
            }
          )
          .getMany();

        const arrivalNames = nearbyArrivalCities.map((city) => city.name);

        // On ne garde que les trajets dont la ville d'arrivée est dans ce rayon
        if (arrivalNames.length) {
          query.andWhere("carpool.arrival_city IN (:...arrivalNames)", {
            arrivalNames,
          });
        }
      } else {
        // Fallback : si la ville n'existe pas en base City, on filtre uniquement par LIKE
        query.andWhere("LOWER(carpool.arrival_city) LIKE LOWER(:arrival)", {
          arrival: `%${arrival}%`,
        });
      }
    }

    // --- Filtrage sur la date exacte ---
    if (date) {
      query.andWhere("carpool.departure_date = :date", { date });
    }

    // --- Filtrage sur l'heure de départ ---
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
