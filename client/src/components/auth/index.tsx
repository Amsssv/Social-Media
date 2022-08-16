import React, { FC, useContext, useEffect, useState } from "react";
import { signIn } from "../../api/services";
import { UserRequiredPayload } from "../../api/types";

const NOOP = (error: Error = null) => {};

const AuthContext = React.createContext(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //get state from cookies and set it to provider state
  }, []);

  useEffect(() => {
    //set user too cookies
  }, [user]);

  const handleSignIt = async (
    payload: UserRequiredPayload,
    callback = NOOP
  ) => {
    try {
      const user = await signIn(payload);
      setUser(user);
      callback();
    } catch (e) {
      callback(e);
    }
  };

  const handleSignOut = (callback = NOOP) => {};

  return (
    <AuthContext.Provider
      value={{ user, signIn: handleSignIt, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
