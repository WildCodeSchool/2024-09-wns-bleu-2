import "reflect-metadata";
import { dataSourceGrumpyCar } from "./dataSource";
import c from "./cities.json";
import { City } from "./City";

function capitalizeCityName(name: string) {
	return name
		.toLowerCase()
		.split(/\s+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function removeDuplicatesByName(jsonArray: any) {
	const seen = new Set();
	return jsonArray.filter((i: any) => {
		if (!seen.has(i.city_code)) {
			seen.add(i.city_code);
			return true;
		}
		return false;
	});
}

function parseGeoNamesLine(city: any): any {
	return {
		zipCode: city.zip_code,
		name: capitalizeCityName(city.city_code),
		location: {
			type: "Point",
			coordinates: [Number(city.longitude), Number(city.latitude)],
		},
	};
}

async function dataSourceInitialize() {
	await dataSourceGrumpyCar.initialize();
	const cityRepository = dataSourceGrumpyCar.getRepository(City);
	await cityRepository.clear();

	const clearCities = removeDuplicatesByName((c as any).cities);
	clearCities.map(async (city: any) => {
		const values = parseGeoNamesLine(city);
		const newCity = City.create(values);
		await newCity.save();
	});
}

dataSourceInitialize();