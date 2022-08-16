import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@calibre/common/logo";
import Container from "@calibre/common/container";
import { signUp } from "@calibre/api/services";
import { UserPayload } from "@calibre/api/types";
import { useToastr } from "@calibre/common/toastr";

import SignUpForm from "./components/sign-up-form";

const SignUp = () => {
  let navigate = useNavigate();
  const { notify } = useToastr();

  const handleSubmit = async (data: UserPayload) => {
    try {
      const response = await signUp(data);
      navigate("/");
    } catch (e) {
      notify(e.message, "error");
    }
  };

  return (
    <Container>
      <div className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <h1 className="uppercase my-4 text-3xl text-center">
          Welcome to calibre
        </h1>
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          Try new experience messaging with calibre
        </p>
        <SignUpForm onSubmit={handleSubmit} />
      </div>
    </Container>
  );
};

export default SignUp;
