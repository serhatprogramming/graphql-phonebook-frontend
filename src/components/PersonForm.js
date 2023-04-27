import React, { useState } from "react";
// apollo-client
import { useMutation, gql } from "@apollo/client";

const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
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

const PersonForm = () => {
  // form field states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  // mutation function create
  const [createPerson] = useMutation(CREATE_PERSON);

  // form submit method...
  const submit = (e) => {
    e.preventDefault();
    console.log("submitted...of...", name, phone, street, city);
    createPerson({ variables: { name, street, city, phone } });
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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default PersonForm;
