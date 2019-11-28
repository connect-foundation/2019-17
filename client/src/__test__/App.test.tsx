import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../apollo/ApolloClient';
import 'intersection-observer';
import 'react-intersection-observer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
