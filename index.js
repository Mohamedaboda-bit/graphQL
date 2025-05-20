import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {schema} from "./schema.js";
import {resolvers} from "./resolvers.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

let server = new ApolloServer({
    typeDefs:schema,
    resolvers: resolvers,
    formatError:(err)=>{
      return {message:err.message}
  }
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
  context:({req})=>{
    let {authorization}=req.headers
    if(authorization){
      try {
        let decoded=jwt.verify(authorization,process.env.JWT_SECRET)
        return decoded
      } catch (error) {
        console.log(error)
      }
    }
  }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});