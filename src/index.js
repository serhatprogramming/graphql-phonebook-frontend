import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// apollo client and graphql
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// setup client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
