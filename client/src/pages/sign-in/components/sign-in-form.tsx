import React, { FC, SyntheticEvent, useState } from "react";
import { UserRequiredPayload } from "@calibre/api/types";
import TextField from "@calibre/common/text-field";

const SignInForm: FC<{ onSubmit: (data: UserRequiredPayload) => void }> = ({
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleClick}
      className="space-y-4 w-full my-2 flex flex-col mb-4"
    >
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
      <input
        type="submit"
        value="Sign in"
        className=" self-center w-1/2 transition duration-300 ease-in-out mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300 "
      />
    </form>
  );
};

export default SignInForm;
