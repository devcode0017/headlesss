import { createElement } from 'react';
import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import { ApolloProvider } from '@apollo/client';

import { client } from '../services/apollo';

import '../styles/global.css';
import '@aamodtgroup/gutenberg-styles/style.css';
import '@aamodtgroup/gutenberg-styles/theme.css';

setup(createElement, prefix);

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
