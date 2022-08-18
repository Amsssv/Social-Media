import React, { FC } from "react";
import { useAuth } from "@calibre/common/auth";
import { useToastr } from "@calibre/common/toastr";
import Container from "../common/container";

const Success: FC = () => {
  const { signOut } = useAuth();
  const { notify } = useToastr();

  const handleClick = () => {
    signOut((error: Error) => error && notify(error.message));
  };

  return (
    <>
      <Container>
        <ul
          className=" my-2 bg-slate-100 block w-full h-96 border border-gray-300 rounded-md"
          id="messages"
        >
          <li className="m-2">First message</li>
        </ul>
        <form className="flex" id="form" action="">
          <input
            className="w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
            id="input"
            autoComplete="off"
          />
          <button className="ml-2 bg-black px-8 py-4 text-white rounded-lg">
            Send
          </button>
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
