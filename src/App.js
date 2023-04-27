// apollo client useQuery
import { useQuery } from "@apollo/client";
// components
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
// queries
import { ALL_PERSONS } from "./queries";

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
