import React, { FC, useState } from "react";

interface Props {
  id: string;
  name: string;
  type: "text" | "password" | "email";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField: FC<Props> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const [valid, isValid] = useState(true);
  return (
    <div className="relative w-full px-8">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={({ target: { value } }) => onChange(value)}
        onBlur={() => isValid(false)}
        autoComplete="off"
        className="form-input block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-gray-900 focus:z-10"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className=" absolute px-1 bg-white z-1 top-3 left-11 duration-300 text-gray-500"
      >
        {placeholder}
      </label>
      {name === "name" && value.length < 5 && !valid && (
        <p className="text-red-500 mx-2">Name is too short </p>
      )}
      {name === "email" && !value.includes("@") && !valid && (
        <p className="text-red-500 mx-2">Incorrect Email</p>
      )}
      {name === "password" && value.length < 8 && !valid && (
        <p className="text-red-500 mx-2">
          Password should be at least 8 characters
        </p>
      )}
    </div>
  );
};

export default TextField;
