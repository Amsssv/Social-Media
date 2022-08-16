import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  return !user ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedLayout;
