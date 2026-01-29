import React from "react";
import { Navigate } from "react-router-dom";
import { ShamcarRoutes } from "./routeEnum";

const Authmiddleware = (props) => {

  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: ShamcarRoutes.Login, state: { from: props.location } }} />
    );
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default Authmiddleware;
