import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Booking } from "../entities/Booking";
import { CarInfos } from "../entities/CarInfos";
import { Carpool } from "../entities/Carpool";
import { City } from "../entities/City";
import { TempUser } from "../entities/TempUser";
import { User } from "../entities/User";


dotenv.config();

export const dataSourceGrumpyCar = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Booking, CarInfos, Carpool, City, TempUser, User  ],
  synchronize: true,
  logging: ["error", "query"],
});