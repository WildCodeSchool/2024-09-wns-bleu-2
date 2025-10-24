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

  if (!Array.isArray(carBrands)) {
    console.log("Le fichier JSON n'est pas un tableau valide.");
    return;
  }

  const carInfos: Partial<CarInfos>[] = carBrands.map((brandData: any) => ({
    id: brandData.id,
    brand: brandData.brand,
  }));

  console.log(`Importing ${carInfos.length} car brands...`);

  const repo = dataSourceGrumpyCar.getRepository(CarInfos);
  await repo.save(carInfos);

  console.log("✅ Importation des marques terminée !");
}
