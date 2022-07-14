import React from "react";

function NotFound() {
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });
  return <h1>PAGE NOT FOUND</h1>;
}

export default NotFound;
