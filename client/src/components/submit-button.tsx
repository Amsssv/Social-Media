import React, { FC } from "react";

interface Props {
  name: string;
}

const SubmitButton: FC<Props> = ({ name }) => {
  return (
    <button className="transition duration-300 ease-in-out mt-2 mb-4 mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300">
      {" "}
      {name}
    </button>
  );
};

export default SubmitButton;
