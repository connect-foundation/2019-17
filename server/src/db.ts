import neo4j from "neo4j-driver";

const db = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic(
    process.env.NEO4J_ID || "neo4j",
    process.env.NEO4J_PASSWORD || "neo4j"
  )
);

db.onCompleted = () => {
  console.log("😆 db completed!");
};

db.onError = error => {
  console.log("😇 db connection fail!");
};

export default db;
