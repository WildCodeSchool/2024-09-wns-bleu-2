import { User } from "../entities/User";
import { Carpool } from "../entities/Carpool";
import { Booking } from "../entities/booking";
import { DataSource } from "typeorm";


export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: "db",
  username: "postgres",
  database: "postgres",
  password: "grumpy",
  entities: [Carpool, User, Booking],
  synchronize: true,
  logging: ["error", "query"],
});
