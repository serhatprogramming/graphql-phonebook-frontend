// apollo client useQuery
import { gql, useQuery } from "@apollo/client";
// components
import Persons from "./components/Persons";

// create a query for allpersons
const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;
// query find person by name
const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return <Persons persons={result.data.allPersons} />;
};

export default App;
