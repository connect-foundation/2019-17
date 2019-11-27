import neo4j from 'neo4j-driver';
import config from './utils/config';

const db = neo4j.driver(
  config.db.host,
  neo4j.auth.basic(config.db.id || '', config.db.password || '')
);

db.onCompleted = () => {
  console.log('😆 db completed!');
};

db.onError = error => {
  console.log(`😇 db connection fail! ${error}`);
};

export default db;
