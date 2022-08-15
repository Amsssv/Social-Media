import React from "react";
import Logo from "../components/logo";
import Container from "../components/container";
import SignUpForm from "../components/sign-up-form";
import { useToastr } from "../components/toastr";

const SignUp = () => {
  const { notify } = useToastr();
  const handleClick = () => {
    notify("сунь хуй в чай", "warning");
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
        <SignUpForm />
        <button onClick={handleClick}>Click me</button>
      </div>
    </Container>
  );
};

export default SignUp;
