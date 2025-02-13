import { Carpool } from "../entities/Carpool";
import { DataSource } from "typeorm";


export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  database: "postgres",
  password: "grumpy",
  entities: [Carpool],
  synchronize: true,
  logging: ["error", "query"],
});
