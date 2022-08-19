import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { useAuth } from "@calibre/common/auth";
import { useToastr } from "@calibre/common/toastr";
import Container from "../common/container";
import io from "socket.io-client";

const socket = io("http://localhost:3333", { autoConnect: false });

const Success: FC = () => {
  const { signOut } = useAuth();
  const { notify } = useToastr();
  const [value, setValue] = useState("");
  const [messeges, setMesseges] = useState([]);

  const handleClick = () => {
    signOut((error: Error) => error && notify(error.message));
  };

  useEffect(() => {
    socket.connect();
  }, []);

  const sendMessage = (e: SyntheticEvent) => {
    e.preventDefault();
    socket.emit("chat message", value);
    setValue("");
  };

  socket.on("chat message", (msg) => {
    setMesseges([...messeges, msg]);
  });

  return (
    <>
      <Container>
        <ul
          className=" my-2 bg-slate-100 block w-full h-96 border border-gray-300 rounded-md"
          id="messages"
        >
          {messeges.map((messege, index) => {
            return (
              <li key={index} className="m-2">
                {messege}
              </li>
            );
          })}
        </ul>
        <form onSubmit={sendMessage} className="flex" id="form" action="">
          <input
            className="w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
            autoComplete="off"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          <input
            type="submit"
            value="Send"
            className=" cursor-pointer ml-2 bg-black px-8 py-4 text-white rounded-lg"
          />
        </form>
        <button
          className="ml-2 bg-black px-8 py-4 text-white rounded-lg"
          onClick={handleClick}
        >
          LogOut
        </button>
      </Container>
    </>
  );
};

export default Success;
