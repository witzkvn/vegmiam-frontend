import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user-selectors";

// Route dans laquelle s'il y a un user connecté on renvoie vers le path dans ProtectedRoute sur App.js, sinon on Redirect vers Home "/"
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(selectCurrentUser);
  const history = useHistory();

  if (!currentUser) {
    history.push("/login");
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
