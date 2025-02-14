import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGrumpyCar } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";
import UserResolver from "./resolvers/UserResolver";
import { BookingResolver } from "./resolvers/bookingResolver";


const start = async () => {
 
  await dataSourceGrumpyCar.initialize();

  const schema = await buildSchema({
    resolvers: [CarpoolResolver, UserResolver, BookingResolver], // Add your resolvers here
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");
};
start();
