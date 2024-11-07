// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div>
      <h3>An error occurred.</h3>
      <p>{error.message}</p>
      <button onClick={() => navigate("/")}>Go to homepage</button>
    </div>
  );
}

export default Error;
