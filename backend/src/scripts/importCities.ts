import fs from "fs";
import path from "path";
import { dataSourceGrumpyCar } from "../config/db";
import { City } from "../entities/City";

export async function importCities() {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../data/cities.json"),
      "utf-8"
    );
    const cities = JSON.parse(rawData);

    if (!Array.isArray(cities)) {
      console.error("Le fichier JSON des villes n'est pas valide.");
      return;
    }

    console.log(`Importation de ${cities.length} villes...`);

    const repo = dataSourceGrumpyCar.getRepository(City);
    await repo.save(cities);

    console.log("✅ Importation des villes terminée !");
  } catch (error) {
    console.error("❌ Erreur lors de l'importation des villes :", error);
  }
}