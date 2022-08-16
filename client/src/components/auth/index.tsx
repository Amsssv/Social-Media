import React, { FC, useContext, useEffect, useState } from "react";
import { signIn } from "../../api/services";
import { useToastr } from "../toastr";
import { UserRequiredPayload } from "../../api/types";
import { useLocation, useNavigate } from "react-router-dom";

const NOOP = () => {};

const AuthContext = React.createContext(null);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  let location = useLocation();
  let navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { notify } = useToastr();

  useEffect(() => {
    if (location.pathname !== "/" && !user) {
      navigate("/");
    }
  }, []);

  const handleSignIt = async (
    payload: UserRequiredPayload,
    callback = NOOP
  ) => {
    try {
      const user = await signIn(payload);
      setUser(user);
      navigate(-1);
      callback();
    } catch (e) {
      notify(e);
    }
  };

  const handleSignOut = (callback = NOOP) => {
    // signOut()
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn: handleSignIt, signOut: handleSignOut }}
    >
      {/*{!user && <Navigate to="/" state={{ from: location }} replace />}*/}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
