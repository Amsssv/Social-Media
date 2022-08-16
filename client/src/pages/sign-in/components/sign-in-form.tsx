import React, { FC, SyntheticEvent, useState } from "react";
import { UserRequiredPayload } from "@calibre/api/types";
import TextField from "@calibre/common/text-field";

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

export default SignInForm;
