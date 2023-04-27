import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// apollo client and graphql
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// setup client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// create gql queries
const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        city
        street
      }
      id
    }
  }
`;

// send a query to the server
client.query({ query }).then((response) => {
  console.log(response.data);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
