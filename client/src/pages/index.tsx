import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./login";
import SignUp from "./sign-up";
import Success from "./success";
import { useAuth } from "../components/auth";

const Page = () => {
  const { user } = useAuth();

  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    { path: "/registration", element: <SignUp /> },
    ...(user ? [{ path: "/success", element: <Success /> }] : []),
  ]);
};

export default Page;
