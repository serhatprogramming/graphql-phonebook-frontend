// apollo client useQuery
import { gql, useQuery } from "@apollo/client";
// components
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

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

const App = () => {
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </>
  );
};

export default App;
