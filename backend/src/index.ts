import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import CarpoolResolver from "./resolvers/CarpoolResolver";


const start = async () => {
 
  await dataSourceGrumpyCar.initialize();

  const schema = await buildSchema({
    resolvers: [CarpoolResolver], // Add your resolvers here
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
