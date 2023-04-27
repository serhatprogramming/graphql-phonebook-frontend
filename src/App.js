// apollo client useQuery
import { gql, useQuery } from "@apollo/client";

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
    <div>{result.data.allPersons.map((person) => person.name).join(", ")}</div>
  );
};

export default App;
