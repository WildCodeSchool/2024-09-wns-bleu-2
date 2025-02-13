import { DataSource } from "typeorm";

export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  database: "postgres",
  password: "grumpy",
  entities: ["src/entities/*.ts"],
  synchronize: true,
  logging: ["error", "query"],
});
