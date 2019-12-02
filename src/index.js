import React              from 'react';
import ReactDOM           from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient   } from 'apollo-client';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { HttpLink       } from 'apollo-link-http';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

const uri    = 'http://thegraph.iex.ec:8030/graphql';
const cache  = new InMemoryCache();
const link   = new HttpLink({ uri });
const client = new ApolloClient({ cache, link });

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
