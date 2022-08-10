import React, { FC, useReducer } from "react";
import TextField from "./text-field";
import Typeform from "./typeform";
import SubmitButton from "./submit-button";
import sendSignUpData from "../api/sign-up-api";

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
  name: "",
  email: "",
  password: "",
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

  const handleClick = () => sendSignUpData(state);

  return (
    <form className="space-y-4 w-full my-2 flex flex-col mb-4">
      <TextField
        name="name"
        id="name"
        placeholder="Name"
        value={state.name}
        onChange={handleChange(Type.CHANGE_NAME)}
      />
      <TextField
        name="email"
        id="email-address"
        placeholder="Email"
        value={state.email}
        onChange={handleChange(Type.CHANGE_EMAIL)}
      />
      <TextField
        name="password"
        id="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange(Type.CHANGE_PASSWORD)}
      />
      <Typeform />
      <SubmitButton onClick={handleClick} name="Create account" />
    </form>
  );
};

export default SignUpForm;
