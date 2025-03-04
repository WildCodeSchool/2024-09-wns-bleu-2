import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGrumpyCar } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";
import "dotenv/config";
import { UserResolver } from "./resolvers/UserResolver";
import { CarInfosResolver } from "./resolvers/CarInfosResolver";
import { importCar } from "./scripts/importCar";
import { BookingResolver } from "./resolvers/BookingResolver";

const port = process.env.PORT || "3000";
console.log(`Le serveur tourne sur le port ${port}`);

const start = async () => {
  await dataSourceGrumpyCar.initialize();

  const schema = await buildSchema({
    resolvers: [CarpoolResolver, UserResolver, CarInfosResolver, BookingResolver],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");

  await importCar();
};
start();