import React from "react";
import { Route, Redirect } from "react-router-dom";
import InvalidCred from "./components/InvalidCred";

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo.userId !== "" &&
        userInfo.alias !== "" &&
        userInfo.accessToken !== "" &&
        userInfo.userId !== null &&
        userInfo.accessToken !== null &&
        userInfo.alias !== null ? (
          <Component {...props} userInfo={userInfo} />
        ) : (
          <InvalidCred />
        )
      }
    />
  );
};

export default PrivateRoute;
