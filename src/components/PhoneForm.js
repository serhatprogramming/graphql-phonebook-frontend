import React, { useState } from "react";
// apollo
import { useMutation } from "@apollo/client";
// queries
import { EDIT_NUMBER } from "../queries";

const PhoneForm = () => {
  // form field states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [editNumber] = useMutation(EDIT_NUMBER);

  const changeNumber = (e) => {
    e.preventDefault();
    editNumber({ variables: { name, phone } });
    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>change phone number</h2>
      <form onSubmit={changeNumber}>
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
        <button>change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
