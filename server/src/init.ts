import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';

import app from './app';
import './db';

const PRODUCTION: string = 'PRODUCTION';
const NODE_ENV: string = process.env.NODE_ENV || '';
const LOCAL_CLIENT_HOST_ADDRESS = process.env.LOCAL_CLIENT_HOST_ADDRESS || '';
const PRODUCTION_CLIENT_HOST_ADDRESS: string =
  process.env.PRODUCTION_CLIENT_HOST_ADDRESS || '';
const CLIENT_HOST_ADDRESS: string =
  PRODUCTION === NODE_ENV
    ? PRODUCTION_CLIENT_HOST_ADDRESS
    : LOCAL_CLIENT_HOST_ADDRESS;

const PORT: string | number = process.env.PORT || 4000;
const ENDPOINT: string = '/graphql';
const PLAYGROUND: string = '/playground';

const corsOptions = {
  origin: CLIENT_HOST_ADDRESS,
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
