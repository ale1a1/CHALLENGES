import React, { useState } from "react";

import AddUser from "./Components/Users/AddUser";
import UsersPrintList from "./Components/Users/UsersPrintList";

const App = () => {
  const users = [];
  const [usersList, setUserInfo] = useState(users);
  const addNewUserToList = (enteredUserInfo) => {
    setUserInfo((prevUserInfo) => {
      return [...prevUserInfo, enteredUserInfo];
    });
  };

  return (
    <div>
      <AddUser newUserAdder={addNewUserToList} />
      <UsersPrintList usersList={usersList} />
    </div>
  );
};

export default App;
