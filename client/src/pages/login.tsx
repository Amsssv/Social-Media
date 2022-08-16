import React, { FC, SyntheticEvent, useState } from "react";
import TextField from "../components/text-field";
import Container from "../components/container";
import Logo from "../components/logo";
import { UserPayload, UserRequiredPayload } from "../api/types";
import { useAuth } from "../components/auth";
import { useToastr } from "../components/toastr";
import { useNavigate } from "react-router-dom";

const SignInForm: FC<{ onSubmit: (data: UserRequiredPayload) => void }> = ({
  onSubmit,
}) => {
  const [name, setName] = useState("Asmmm");
  const [password, setPassword] = useState("123123");

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ name, password });
  };

  return (
    <form onSubmit={handleClick} className="space-y-4 w-full my-2">
      <TextField
        name="name"
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={setName}
      />
      <TextField
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <input
        type="submit"
        value="Sign in"
        className=" self-center w-1/2 transition duration-300 ease-in-out mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300 "
      />
    </form>
  );
};

const Login = () => {
  const { signIn } = useAuth();
  const { notify } = useToastr();
  const navigate = useNavigate();

  const handleSubmit = async (data: UserPayload) => {
    signIn(data, (error: Error) => {
      if (error) {
        notify(error.message);
        return;
      }

      navigate(-1);
    });
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
