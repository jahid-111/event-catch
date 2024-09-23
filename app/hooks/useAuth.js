import React, { useContext } from "react";
import { AuthContext } from "../contexts";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
};

export default useAuth;
