import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

const PublicLayout = () => {
  const { user } = useAuth();
  return user ? <Navigate to={"/success"} replace /> : <Outlet />;
};

export default PublicLayout;
