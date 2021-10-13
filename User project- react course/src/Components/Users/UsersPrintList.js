import React from "react";

import Card from "../UI/Card";
import classes from "./UserPrintList.module.css";

const UsersPrintList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.usersList.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersPrintList;
