import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currrentuser, setcurrrentuser] = useState(
    JSON.parse(localStorage.getItem("userInfo") || null)
  );

  const login = async (form) => {
    const res = await axiosInstance.post("auth/login", form);

    setcurrrentuser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(currrentuser));
  }, [currrentuser]);

  return (
    <AuthContext.Provider value={{ currrentuser, setcurrrentuser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
