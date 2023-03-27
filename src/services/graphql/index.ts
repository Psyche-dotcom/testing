import { ApolloClient, InMemoryCache, DefaultOptions } from "@apollo/client";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  /* headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  }, */
  uri: `${BASE_URL}`,
  defaultOptions: defaultOptions,
  cache: new InMemoryCache(),
});
