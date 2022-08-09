import React from "react";
import Logo from "../components/logo";
import TextField from "../components/text-field";
import SubmitButton from "../components/submit-button";
import Container from "../components/container";
import Typeform from "../components/typeform";

const SignUpPage = () => {
  return (
    <Container>
      <form className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <h1 className="uppercase my-4 text-3xl text-center">
          Welcome to calibre
        </h1>
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          {" "}
          Try new experience messaging with calibre{" "}
        </p>
        <div className="space-y-4 w-full my-2">
          <TextField name="name" id="name" placeholder="Name" />
          <TextField name="email" id="email-address" placeholder="Email" />
          <TextField name="password" id="password" placeholder="Password" />
        </div>
        <Typeform />
        <SubmitButton name="Create account" />
      </form>
    </Container>
  );
};

export default SignUpPage;
