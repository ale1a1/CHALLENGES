import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [error, setError] = useState();

  const userNameInput = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const ageInput = (event) => {
    event.preventDefault();
    setUserAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUserInfo = {
      name: userName,
      age: userAge,
      id: Math.random().toString(),
    };
    if (enteredUserInfo.name.length === 0 || enteredUserInfo.age.length === 0) {
      setError({
        title: "invalid input",
        message: "insert a name and an age",
      });
      return;
    }
    if (parseInt(enteredUserInfo.age) < 0) {
      setError({
        title: "invalid input",
        message: "insert a valid age (>0)",
      });
      return;
    }
    props.newUserAdder(enteredUserInfo);
    setUserName("");
    setUserAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onClick={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={userNameInput}
          />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" value={userAge} onChange={ageInput} />
          <Button onClick={errorHandler} type="submit">
            Add User
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
