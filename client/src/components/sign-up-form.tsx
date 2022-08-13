import React, { FC, SyntheticEvent, useReducer } from "react";
import TextField from "./text-field";
import Typeform from "./typeform";
import { signUp } from "../api";

enum Type {
  CHANGE_NAME = "CHANGE_NAME",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface Action {
  type: Type;
  payload: string;
}

interface State {
  name: string;
  email: string;
  password: string;
}

const initialState = {
  name: "Alex",
  email: "Amsssv@yandex.ru",
  password: "1234",
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case Type.CHANGE_NAME:
      return {
        ...state,
        name: payload,
      };
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

const SignUpForm: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (type: Type) => (payload: string) =>
    dispatch({ type, payload });

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    signUp(state);
  };

  return (
    <form
      className="space-y-4 w-full my-2 flex flex-col mb-4"
      onSubmit={handleClick}
    >
      <TextField
        name="name"
        id="name"
        type="text"
        placeholder="Name"
        value={state.name}
        onChange={handleChange(Type.CHANGE_NAME)}
      />
      <TextField
        name="email"
        id="email-address"
        type="email"
        placeholder="Email"
        value={state.email}
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
        value="Create account"
        className=" self-center w-1/2 transition duration-300 ease-in-out mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300 "
      />
    </form>
  );
};

export default SignUpForm;
