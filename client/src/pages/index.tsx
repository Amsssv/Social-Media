import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Login from "./login";
import SignUp from "./sign-up";
import Success from "./success";
import { useAuth } from "../components/auth";

const Page = () => {
  const { user } = useAuth();

  useEffect(() => {
    //user check and path check if ok navigate
  });

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
