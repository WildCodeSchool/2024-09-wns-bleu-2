import "dotenv/config";
import * as cookie from "cookie";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGrumpyCar } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { CarInfosResolver } from "./resolvers/CarInfosResolver";
import { importCar } from "./scripts/importCar";
import { BookingResolver } from "./resolvers/BookingResolver";
import jwt, { Secret } from "jsonwebtoken";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { importCities } from "./scripts/importCities";
import { CityResolver } from "./resolvers/CityResolver";

const port = process.env.PORT || "4000";
console.log(`Le serveur tourne sur le port ${port}`);

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("No JWT secret key");
  }

  await dataSourceGrumpyCar.initialize();

  const schema = await buildSchema({
    resolvers: [
      CarpoolResolver,
      UserResolver,
      CarInfosResolver,
      BookingResolver,
      CityResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageDisabled()],
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);

        if (cookies.token) {
          try {
            const payload: any = jwt.verify(
              cookies.token,
              process.env.JWT_SECRET_KEY as Secret
            );

            if (payload) {
              return { email: payload.email, res };
            }
          } catch (error) {}
        }
      }

      return { res };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");

  await importCar();
  await importCities();
};

start();
