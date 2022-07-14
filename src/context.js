import React from "react";

let user = localStorage.getItem("user");
if (user) {
  user = JSON.parse(user);
}

export const ProfileContext = React.createContext(user);
