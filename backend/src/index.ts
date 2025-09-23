import "dotenv/config";
import * as cookie from "cookie";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { ApolloServer } from "@apollo/server";
import { dataSourceGrumpyCar } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { CarInfosResolver } from "./resolvers/CarInfosResolver";
import { importCar } from "./scripts/importCar";
import { BookingResolver } from "./resolvers/BookingResolver";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { CityResolver } from "./resolvers/CityResolver";
import depthLimit from "graphql-depth-limit";

const port = process.env.PORT || "4000";
console.log(`Le serveur tourne sur le port ${port}`);

const app = express();
const httpServer = http.createServer(app);

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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(10)],
  });

  const corsOptions: cors.CorsOptions = {
    origin: ["http://localhost:5173", "https://studio.apollographql.com"],
    credentials: true,
  };

  // Middlewares communs
  const commonMiddleware = [
    cors<cors.CorsRequest>(corsOptions),
    express.json({ limit: "50mb" }),
  ];

  console.log("avant");
  await server.start();

  console.log("apres");

  app.use(
    "/",
    ...commonMiddleware,
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        if (req.headers.cookie) {
          const cookies = cookie.parse(req.headers.cookie as string);

          if (cookies.token) {
            try {
              const payload: JwtPayload = jwt.verify(
                cookies.token,
                process.env.JWT_SECRET_KEY as Secret
              ) as unknown as JwtPayload;

              if (payload) {
                return { email: payload.email, res };
              }
            } catch (error) {}
          }
        }

        return { res };
      },
    })
  );

  console.log(`🚀 Server listening at: localhost:4000`);
  console.log("test hot reload");

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  await importCar();
};

start();
