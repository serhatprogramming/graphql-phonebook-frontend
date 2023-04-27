import React, { useState } from "react";
// apollo-client
import { useQuery } from "@apollo/client";
// components
import Person from "./Person";
// queries
import { FIND_PERSON } from "../queries";

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (result.data && nameToSearch) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.phone}
          <button onClick={() => setNameToSearch(person.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
