import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios";
import "../components/overlay.scss";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currrentuser, setcurrrentuser] = useState(
    JSON.parse(localStorage.getItem("userInfo") || null)
  );

  const [worker_id, setworker_id] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showLoader, setshowLoader] = useState(false);
  const login = async (form) => {
    setshowLoader(true);

    const res = await axiosInstance.post("auth/login", form);

    setcurrrentuser(res.data.otherInfo);
    setworker_id(res.data.worker_id);

    setTimeout(() => {
      setshowLoader(false);
      window.location.href = `/worker-profile/${res.data.worker_id}`;
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(currrentuser));
  }, [currrentuser]);

  //handle logout
  const logoutWorker = () => {
    setLoading(true);

    try {
      const res = axiosInstance.post("auth/logout");
      window.localStorage.removeItem("userInfo");
      console.log(res.data);
      setcurrrentuser(null);

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/";
      }, 3000);
      console.log(res.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currrentuser, setcurrrentuser, login, logoutWorker, worker_id }}
    >
      {children}

      {showLoader ||
        (loading && (
          <div className="overlay-signin">
            <span>
              {loading ? "Logging out..." : showLoader ? "Please wait..." : ""}
            </span>
            <span className="loader"></span>
          </div>
        ))}
    </AuthContext.Provider>
  );
};
