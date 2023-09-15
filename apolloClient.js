import { ApolloClient, InMemoryCache } from '@apollo/client';
const BASE_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

const client = new ApolloClient({
    uri: BASE_URL,
    cache: new InMemoryCache(),
});

export default client;