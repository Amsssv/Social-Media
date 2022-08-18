import React, { FC, useContext, useEffect, useState } from "react";
import { signIn } from "../../api/services";
import { UserRequiredPayload } from "../../api/types";
import { getCookie, removeCookie } from "../../utils";

const NOOP = (error: Error = null) => {};

const AuthContext = React.createContext(null);

interface Props {
  children: React.ReactNode;
}

const ACCESS_TOKEN = "accessToken";

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN);
    if (token) {
      setUser(token);
    } else {
      removeCookie(ACCESS_TOKEN);
    }
  }, []);

  const handleSignIt = async (payload: UserRequiredPayload) => {
    try {
      const user = await signIn(payload);
      setUser(user);
    } catch (e) {
      throw e;
    }
  };

  const handleSignOut = (errorFn = NOOP) => {
    setUser(null);
    removeCookie(ACCESS_TOKEN);
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
