export const SEND_FRIEND_MUTATION = (email, relation) => `mutation {
    requestFriend(targetEmail: "${email}", relation: "${relation}")
  }`;

export const CHECK_REQUEST_EXISTENCE = `MATCH (:User {email: {toEmail}})<-[r:REQUEST_FRIEND]-(:User {email: {fromEmail}}) 
RETURN CASE WHEN r IS NULL THEN 'FALSE'
ELSE 'TRUE' END as existence`;

export const CHECK_FRIEND_EXISTENCE = `MATCH (:User {email: {toEmail}})-[r:FRIEND]-(:User {email: {fromEmail}}) 
RETURN CASE WHEN r IS NULL THEN 'FALSE'
ELSE 'TRUE' END as existence`;
