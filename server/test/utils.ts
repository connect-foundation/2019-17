import dotenv from "dotenv";
import request from "request-promise-native";
dotenv.config();

import { Options } from "graphql-yoga";
import app from "../src/app";

const PORT: string | number = process.env.PORT || 6000;
const ENDPOINT: string = "/graphql";
const PLAYGROUND: string = "/playground";

const startServer = () => {
  const appOptions: Options = {
    port: PORT,
    endpoint: ENDPOINT,
    playground: PLAYGROUND
  };

  const handleStart = () => {
    console.log(`✅ server on PORT : ${PORT}`);
  };

  app.start(appOptions, handleStart);

  return app;
};

const requestQuery = query => {
  return request({
    uri: `http://localhost:${PORT}/graphql`,
    method: "POST",
    json: true,
    body: { query },
    headers: {
      "X-GraphQL-Deduplicate": true
    }
  }).promise();
};

export { startServer, requestQuery };
