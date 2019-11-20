import neo4j from 'neo4j-driver';

const PRODUCTION: string = 'PRODUCTION';
const NEO4J_ID: string = process.env.NEO4J_ID || '';
const NEO4J_PASSWORD: string = process.env.NEO4J_PASSWORD || '';
const DB_HOST: string = process.env.DB_HOST || '';
const NODE_ENV: string = process.env.NODE_ENV || '';

const db = neo4j.driver(
  `bolt://${NODE_ENV === PRODUCTION ? DB_HOST : 'localhost'}`,
  neo4j.auth.basic(
    NODE_ENV === PRODUCTION ? NEO4J_ID : 'neo4j',
    NODE_ENV === PRODUCTION ? NEO4J_PASSWORD : 'neo4j'
  )
);

db.onCompleted = () => {
  console.log('😆 db completed!');
};

db.onError = error => {
  console.log(`😇 db connection fail! ${error}`);
};

export default db;
