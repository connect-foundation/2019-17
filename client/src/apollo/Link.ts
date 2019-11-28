import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { DocumentNode } from 'graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const uploadLink = createUploadLink({ uri: 'http://localhost:4000/graphql' });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

const checkSubscription = ({ query }: { query: DocumentNode }): boolean => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
};

const checkFile = (value: any) =>
  (typeof File !== 'undefined' && value instanceof File) ||
  (typeof Blob !== 'undefined' && value instanceof Blob);

const requestLink = split(checkSubscription, wsLink, httpLink);
const terminalLink = split(checkFile, uploadLink, requestLink);

export default terminalLink;
