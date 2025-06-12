import { Arg, Query, Resolver } from "type-graphql";
import { City } from "../entities/City";
import { Like } from "typeorm";
import { Point } from "geojson";

@Resolver(City)
export class CityResolver {
	@Query(() => City)
	async getOrCreateCityByName(
		@Arg("name") name: string
	): Promise<City> {
		const cityRepository = City.getRepository();

		// Vérifie si la ville existe déjà en BDD
		let city = await cityRepository.findOne({
			where: { name: Like(`${name}`) },
		});

		if (city) return city;

		// Appel à l'API Nominatim pour récupérer les coordonnées GPS
		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`, {
			headers: {
				// headers fortement recommandé par Nomination pour éviter les abus d'appels API
				"User-Agent": "GrumpyCar/1.0"
			}
		});

		const data = await response.json();

		if (!data.length) {
			throw new Error(`No coordinates found for the city ${name}`);
		}

		const result = data[0];
		const latitude = parseFloat(result.lat);
		const longitude = parseFloat(result.lon);

		const location: Point = {
			type: "Point",
			coordinates: [longitude, latitude],
		};

		city = City.create({ name, location });
		await city.save();

		return city;
	}

	@Query(() => [City])
	async getCities(): Promise<City[]> {
		return await City.find();
	}
}