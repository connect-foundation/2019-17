import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { DocumentNode } from 'graphql';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

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

const checkFile = (value: any) => {
  const { variables } = value;
  if (variables.file) {
    return (
      (typeof File !== 'undefined' && variables.file instanceof File) ||
      (typeof Blob !== 'undefined' && variables.file instanceof Blob)
    );
  } else if (variables.files) {
    return variables.files.every(
      (file: any) =>
        (typeof File !== 'undefined' && file instanceof File) ||
        (typeof Blob !== 'undefined' && file instanceof Blob)
    );
  } else {
    return false;
  }
};

const requestLink = split(checkSubscription, wsLink, httpLink);
const terminalLink = split(checkFile, uploadLink, requestLink);

export default terminalLink;