
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "./auth";

const PrivateRoute = () => {
  const isAuth = auth.isAuthenticated();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;