import fs from "fs";
import path from "path";
import { dataSourceGrumpyCar } from "../config/db";
import { CarInfos } from "../entities/CarInfos";
export {};
export async function importCar() {
  // Lis le fichier JSON
  const rawData = fs.readFileSync(
    path.join(__dirname, "../data/brands.json"),
    "utf-8"
  );
  const carBrands = JSON.parse(rawData);

  // Vérifie que carBrands est un tableau
  if (!Array.isArray(carBrands)) {
    console.log("Le fichier JSON n'est pas un tableau valide.");
    return;
  }

  // Assure-toi que les données correspondent à l'entité CarInfos
  const carInfos: Partial<CarInfos>[] = carBrands.map((brandData: any) => ({
    id: brandData.id,
    brand: brandData.brand,
  }));

  console.log(`Importing ${carInfos.length} car brands...`);

  const repo = dataSourceGrumpyCar.getRepository(CarInfos);
  await repo.save(carInfos); // Sauvegarde les marques dans la base de données

  console.log("✅ Importation des marques terminée !");
}
