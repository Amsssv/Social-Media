import React from "react";
import TextField from "../components/text-field";
import Container from "../components/container";
import Logo from "../components/logo";
import SubmitButton from "../components/submit-button";

const Login = () => {
  return (
    <Container>
      <div className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          Log in to Calibre
        </p>
        <form className="space-y-4 w-full my-2">
          <TextField
            name="email"
            id="email-address"
            placeholder="Email"
            value={""}
            onChange={""}
          />
          <TextField
            name="password"
            id="password"
            placeholder="Password"
            value={""}
            onChange={""}
          />
          <SubmitButton name="Create account" />
        </form>
      </div>
    </Container>
  );
};

export default Login;
