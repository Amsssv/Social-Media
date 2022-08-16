import React, { SyntheticEvent, useReducer } from "react";
import TextField from "../components/text-field";
import Container from "../components/container";
import Logo from "../components/logo";
import Typeform from "../components/typeform";
import { useToastr } from "../components/toastr";
import { logIn } from "../api";

enum Type {
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface Action {
  type: Type;
  payload: string;
}

interface State {
  email: string;
  password: string;
}

const initialState = {
  email: "",
  password: "",
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case Type.CHANGE_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case Type.CHANGE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    default:
      return state;
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { notify } = useToastr();

  const handleChange = (type: Type) => (payload: string) =>
    dispatch({ type, payload });

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    logIn(state)
      .then(() => notify("You successfully Log In", "success"))
      .catch((err) => notify(err, "error"));
  };

  return (
    <Container>
      <div className="border border-gray-100 rounded-lg shadow-lg flex items-center flex-col">
        <Logo />
        <p className="uppercase text-xl text-slate-500 w-64 text-center mb-2">
          Log in to Calibre
        </p>
        <form
          className="space-y-4 w-full my-2 flex flex-col mb-4"
          onSubmit={handleClick}
        >
          <TextField
            name="email"
            id="email-address"
            type="email"
            placeholder="Email"
            value={state.email.toLocaleLowerCase().trim()}
            onChange={handleChange(Type.CHANGE_EMAIL)}
          />
          <TextField
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange(Type.CHANGE_PASSWORD)}
          />
          <Typeform />
          <input
            type="submit"
            value="Sign In"
            className="cursor-pointer self-center w-1/2 transition duration-300 ease-in-out mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300 "
          />
        </form>
      </div>
    </Container>
  );
};

export default Login;
