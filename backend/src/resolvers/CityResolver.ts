import { Arg, Query, Resolver } from "type-graphql";
import { City } from "../entities/City";
import { ILike } from "typeorm";
import { Point } from "geojson";

@Resolver(City)
export class CityResolver {
	@Query(() => City)
	async getOrCreateCityByName(@Arg("name") name: string): Promise<City> {
		// On formate le nom de la ville entré par l'utilisateur pour qu'il soit insensible à la casse avec une regex qui permet de formater les noms composés (ex : aix en provence devient Aix-En-Provence)
		const normalizeCityName = (name: string): string => {
        	return name
				.toLowerCase()
            .replace(/[-_]/g, ' ')	// remplace tirets/underscores par espaces
            .replace(/\s+/g, ' ')	// évite les doubles espaces
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('-');
    	};
		const formattedName = normalizeCityName(name);

		// On vérifie si la ville existe déjà en BDD avec ILike (insensible à la casse)
		let city = await City.findOne({ where: { name: ILike(formattedName) } });

		// Si elle n'existe pas, on l'ajoute en BDD
		if (!city) {
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
		}

		return city;
	}

	@Query(() => [City])
	async getCities(
		@Arg("city", { nullable: true }) city?: string
		): Promise<City[]> {
		if (city) {
			return await City.find({
				where: { name: ILike(`${city}%`) },
				take: 10,
				order: { name: "ASC" }
			});
		}
		return await City.find({ take: 10, order: { name: "ASC" } });
	}
}