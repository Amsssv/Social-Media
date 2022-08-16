import React, { FC, useState, useEffect } from "react";
import cn from "classnames";
import { ToastrMessageType } from "./types";

interface Props {
  id: number;
  message: string;
  onDelete: (id: number) => void;
  type: ToastrMessageType;
}

const ToastrItem: FC<Props> = ({ id, message, type, onDelete }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    setState(
      setTimeout(() => {
        onDelete(id);
      }, 3000)
    );
  }, []);

  const handleButtonClick = () => {
    onDelete(id);
    clearInterval(state);
  };

  return (
    <div
      className={cn(
        "flex content-center justify-between w-72 h-16 border my-2 border-gray-200 rounded-lg shadow-lg opacity-75",
        {
          "bg-red-500": type === "error",
          "bg-green-500": type === "success",
          "bg-cyan-500": type === "info",
          "bg-yellow-500": type === "warning",
        }
      )}
    >
      <h1 className="mx-2 self-center">{message}</h1>
      <button className="mx-3 my-1 self-start" onClick={handleButtonClick}>
        X
      </button>
    </div>
  );
};

export default ToastrItem;
