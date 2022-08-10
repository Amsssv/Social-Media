import React, { FC } from "react";

type Click = () => void;

interface Props {
  name: string;
  onClick: Click;
}

const SubmitButton: FC<Props> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" self-center w-1/2 transition duration-300 ease-in-out mx-6 bg-black px-16 py-4 text-white rounded-lg hover:shadow-md hover:shadow-gray-400 delay-300 "
    >
      {name}
    </button>
  );
};

export default SubmitButton;
