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

const port = process.env.PORT || "4000";
console.log(`Le serveur tourne sur le port ${port}`);

const start = async () => {
  if (process.env.JWT_SECRET_KEY === undefined || process.env.JWT_SECRET_KEY === null) {
    throw Error("No JWT secret key")
  }

  await dataSourceGrumpyCar.initialize();

  const schema = await buildSchema({
    resolvers: [
      CarpoolResolver,
      UserResolver,
      CarInfosResolver,
      BookingResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    // Sert à vérifier si un utilisateur est connecté
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);
        if (cookies.token) {
          const payload: any = jwt.verify(
            cookies.token,
            process.env.JWT_SECRET_KEY as Secret
          );
          console.log("payload in context", payload);
          if (payload) {
            console.log("payload was found and returned to resolver");
            return { email: payload.email, res: res };
          }
        }
      }
      return { res: res};
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");

  await importCar();
};
start();
