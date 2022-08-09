import React, { FC } from "react";

interface Props {
  id: string;
  children: React.ReactNode;
}

const CheckBox: FC<Props> = ({ id, children }) => {
  return (
    <div className="flex flex-row items-center my-2">
      <input
        className="flex-0 self-start w-5 h-5 accent-black mx-2 mt-1"
        type="checkbox"
        value=""
        id={id}
      />
      <label className="flex-1 text-gray-800" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

export default CheckBox;
