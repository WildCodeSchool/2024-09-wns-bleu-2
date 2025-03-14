import { DataSource } from "typeorm";

export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: ["error", "query"],
});
