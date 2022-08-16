import React, { FC, useContext, useEffect, useState } from "react";
import { signIn } from "../../api/services";
import { UserRequiredPayload } from "../../api/types";
import { getCookie, removeCookie, setCookie } from "../../utils";

const NOOP = (error: Error = null) => {};

const AuthContext = React.createContext(null);

interface Props {
  children: React.ReactNode;
}

const COOKIE_NAME = "token";

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie(COOKIE_NAME);
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  useEffect(() => {
    !user
      ? removeCookie(COOKIE_NAME)
      : setCookie(COOKIE_NAME, JSON.stringify(user));
  }, [user]);

  const handleSignIt = async (payload: UserRequiredPayload, errorFn = NOOP) => {
    try {
      const user = await signIn(payload);
      setUser(user);
    } catch (e) {
      errorFn(e);
    }
  };

  const handleSignOut = (errorFn = NOOP) => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn: handleSignIt, signOut: handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
