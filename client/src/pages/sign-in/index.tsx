import React from "react";
import Container from "@calibre/common/container";
import Logo from "@calibre/common/logo";
import { UserPayload } from "@calibre/api/types";
import { useAuth } from "@calibre/common/auth";
import { useToastr } from "@calibre/common/toastr";
import SignInForm from "./components/sign-in-form";

const Login = () => {
  const { signIn } = useAuth();
  const { notify } = useToastr();

  const handleSubmit = async (data: UserPayload) => {
    signIn(data, (error: Error) => error && notify(error.message));
  };

  return (
    <Container>
      <div className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          Log in to Calibre
        </p>
        <SignInForm onSubmit={handleSubmit} />
      </div>
    </Container>
  );
};

export default Login;
