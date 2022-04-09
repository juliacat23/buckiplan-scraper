import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000', /*  graphql server will be running on localhost:4000 */
});

/* instantiate ApolloClient by passing 
in the httpLink and a new instance
of in InMemoryCache() */
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
