// react
import { useState } from "react";
// apollo client useQuery
import { useApolloClient, useQuery } from "@apollo/client";
// components
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notify from "./components/Notify";
import PhoneForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
// queries
import { ALL_PERSONS } from "./queries";

const App = () => {
  // token state
  const [token, setToken] = useState(null);
  // errorMessage state
  const [errorMessage, setErrorMessage] = useState(null);
  // apollo client
  const client = useApolloClient();
  // all persons query
  const result = useQuery(ALL_PERSONS);
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
