import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";

import app from "./app";

const PORT: string | number = process.env.PORT || 4000;
const ENDPOINT: string = "/graphql";
const PLAYGROUND: string = "/playground";

const appOptions: Options = {
  port: PORT,
  endpoint: ENDPOINT,
  playground: PLAYGROUND
};

const handleStart = () => {
  console.log(`✅ server on PORT : ${PORT}`);
};

app.start(appOptions, handleStart);
