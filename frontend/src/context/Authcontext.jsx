import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios";
import "../components/overlay.scss";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currrentuser, setcurrrentuser] = useState(
    JSON.parse(localStorage.getItem("userInfo") || null)
  );
  const [showLoader, setshowLoader] = useState(false);
  const login = async (form) => {
    setshowLoader(true);

    const res = await axiosInstance.post("auth/login", form);

    setcurrrentuser(res.data);

    setTimeout(() => {
      setshowLoader(false);
      window.location.href = `/worker-profile/${currrentuser.worker_id}`;
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(currrentuser));
  }, [currrentuser]);

  return (
    <AuthContext.Provider value={{ currrentuser, setcurrrentuser, login }}>
      {children}

      {showLoader && (
        <div className="overlay-signin">
          <span>Please wait...</span>
          <span className="loader"></span>
        </div>
      )}
    </AuthContext.Provider>
  );
};
