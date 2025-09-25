import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { City } from "./City";

dotenv.config();

export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: [City],
  synchronize: true,
  logging: ["error", "query"],
});