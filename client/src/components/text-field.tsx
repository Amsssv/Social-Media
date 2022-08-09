import React, { FC } from "react";

interface Props {
  id: string;
  name: string;
  placeholder: string;
}

const TextField: FC<Props> = ({ id, name, placeholder }) => {
  return (
    <div className="relative w-full px-8">
      <input
        id={id}
        name={name}
        type={name}
        required
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
    </div>
  );
};

export default TextField;
