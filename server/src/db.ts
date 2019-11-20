import neo4j from 'neo4j-driver';

const PRODUCTION = 'PRODUCTION';
const NEO4J_ID: string = process.env.NEO4J_ID || '';
const NEO4J_PASSWORD: string = process.env.NEO4J_PASSWORD || '';
const DB_HOST: string = process.env.DB_HOST || '';
const ENV: string = process.env.ENV || '';

const db = neo4j.driver(
  `bolt://${ENV === PRODUCTION ? DB_HOST : 'localhost'}`,
  neo4j.auth.basic(
    ENV === PRODUCTION ? NEO4J_ID : 'neo4j',
    ENV === PRODUCTION ? NEO4J_PASSWORD : 'neo4j'
  )
);

db.onCompleted = () => {
  console.log('😆 db completed!');
};

db.onError = error => {
  console.log(`😇 db connection fail! ${error}`);
};

export default db;
