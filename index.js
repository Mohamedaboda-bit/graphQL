import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {schema} from "./schema.js";
import {resolvers} from "./resolvers.js";
import mongoose from "mongoose";

let server = new ApolloServer({
    typeDefs:schema,
    resolvers: resolvers, 
});

mongoose
  .connect("mongodb://127.0.0.1:27017/graphqlDB")
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});