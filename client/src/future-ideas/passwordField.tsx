import React, { FC } from "react";
import ShowButton from "./showButton";

type Change = (value: string) => void;

interface Props {
  value: string;
  onChange: Change;
}

const PasswordField: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative w-full px-8">
      <input
        id="password"
        name="Password"
        type="password"
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        required
        autoComplete="off"
        className="form-input block w-1/2 p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-gray-900 focus:z-10"
        placeholder="Password"
      />
      <button>
        <ShowButton />
      </button>
      <label
        htmlFor="password"
        className=" absolute px-1 bg-white z-1 top-3 left-11 duration-300 text-gray-500"
      >
        Password
      </label>
    </div>
  );
};
export default PasswordField;
