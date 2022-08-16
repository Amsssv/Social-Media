import React, { FC } from "react";
import { useAuth } from "@calibre/common/auth";
import { useToastr } from "@calibre/common/toastr";

const Success: FC = () => {
  const { signOut } = useAuth();
  const { notify } = useToastr();

  const handleClick = () => {
    signOut((error: Error) => error && notify(error.message));
  };

  return (
    <>
      <h1>You successfully signed up</h1>
      <button onClick={handleClick}>LogOut</button>
    </>
  );
};

export default Success;
