import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';

import app from './app';
import './db';

const PORT: string | number = process.env.PORT || 4000;
const ENDPOINT: string = '/graphql';
const PLAYGROUND: string = '/playground';
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
const appOptions: Options = {
  port: PORT,
  endpoint: ENDPOINT,
  playground: PLAYGROUND,
  cors: corsOptions
};

const handleStart = () => {
  console.log(`✅ server on PORT : ${PORT}`);
};

app.start(appOptions, handleStart);
