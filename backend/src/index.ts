import "dotenv/config";
import * as cookie from "cookie";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { dataSourceGrumpyCar } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { CarInfosResolver } from "./resolvers/CarInfosResolver";
import { importCar } from "./scripts/importCar";
import { BookingResolver } from "./resolvers/BookingResolver";
import jwt, { Secret } from "jsonwebtoken";
import { importCities } from "./scripts/importCities";
import { CityResolver } from "./resolvers/CityResolver";
import { expressMiddleware } from "@as-integrations/express5";

const port = process.env.PORT || "4000";
console.log(`Le serveur tourne sur le port ${port}`);

const start = async () => {
  try {
    console.log("Vérification de la clé JWT...");
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("No JWT secret key");
    }

    console.log("Connexion à la base de données...");
    await dataSourceGrumpyCar.initialize();
    console.log("Base de données connectée avec succès.");

    const schema = await buildSchema({
      resolvers: [
        CarpoolResolver,
        UserResolver,
        CarInfosResolver,
        BookingResolver,
        CityResolver,
      ],
    });

    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    console.log("Démarrage du serveur Apollo...");
    await server.start();
    console.log("Serveur Apollo démarré avec succès.");

    app.use(
      "/graphql",
      cors<cors.CorsRequest>({
        origin: "http://localhost:5173",
        credentials: true,
      }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          if (req.headers.cookie) {
            const cookies = cookie.parse(req.headers.cookie);

            if (cookies.token) {
              try {
                const payload: any = jwt.verify(
                  cookies.token,
                  process.env.JWT_SECRET_KEY as Secret
                );

                if (payload) {
                  return { email: payload.email, res };
                }
              } catch (error) {
                console.error("Token verification failed:", error);
              }
            }
          }

          return { res };
        },
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen(4000, "0.0.0.0", () => {
        console.log("Serveur en écoute sur 0.0.0.0:4000");
        resolve();
      })
    );
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);

    await importCar();
    await importCities();
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur:", error);
  }
};

start().catch((error) => {
  console.error("Erreur lors du démarrage du serveur:", error);
});
