import React, { useState } from "react";
// apollo-client
import { useMutation } from "@apollo/client";
// queries
import { ALL_PERSONS, CREATE_PERSON } from "../queries";

const PersonForm = ({ setError }) => {
  // form field states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  // mutation function create
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  // form submit method...
  const submit = (e) => {
    e.preventDefault();
    createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : undefined,
      },
    });
    setCity("");
    setStreet("");
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>add person</h2>
      <form onSubmit={submit}>
        <div>
          name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div>
          city:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button>add person</button>
      </form>
    </div>
  );
};

export default PersonForm;
