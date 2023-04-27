import React, { useState, useEffect } from "react";
// apollo
import { useMutation } from "@apollo/client";
// queries
import { EDIT_NUMBER } from "../queries";

const PhoneForm = ({ setError }) => {
  // form field states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [editNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && !result.data.editNumber) {
      setError("name not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

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
