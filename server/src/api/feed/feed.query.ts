export const WRITING_FEED_QUERY = `MATCH (u:User)
                                   WHERE u.email = $email
                                  CREATE (f:Feed {content: $content, createdAt: datetime()}) 
                                  CREATE (u)-[r:AUTHOR]->(f)
                                  RETURN f`;

export const createImageNodeAndRelation = (idx, Location) =>
  `CREATE (i${idx}:Image {url: '${Location}'}) CREATE (i${idx})-[:HAS]->(f) `;
