// react
import { useState } from "react";
// apollo client useQuery
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
// components
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
// queries
import { ALL_PERSONS } from "./queries";
import { PERSON_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = () => {
  // token state
  const [token, setToken] = useState(null);
  // errorMessage state
  const [errorMessage, setErrorMessage] = useState(null);
  // apollo client
  const client = useApolloClient();
  // all persons query
  const result = useQuery(ALL_PERSONS);
  // subscription for person added
  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);

      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });
  // logout
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  // notify
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setError={notify} setToken={setToken} />
      </>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
