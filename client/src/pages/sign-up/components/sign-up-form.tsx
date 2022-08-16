import React, { FC, SyntheticEvent, useState } from "react";
import TextField from "@calibre/common/text-field";
import Typeform from "@calibre/common/typeform";
import { UserPayload } from "../../../api/types";

const SignUpForm: FC<{ onSubmit: (data: UserPayload) => void }> = ({
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ name, password, email });
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
        value={name}
        onChange={setName}
      />
      <TextField
        name="email"
        id="email-address"
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
      <TextField
        name="password"
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
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
