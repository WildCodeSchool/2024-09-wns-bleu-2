import { buildSchema } from "graphql";

const start = async () => {};

const schema = await buildSchema({
  resolvers: [],
});

const server = new ApolloServer({
  schema,
});
