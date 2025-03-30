import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios";
export const ClientContext = createContext();
import "../components/overlay.scss";
export const ClientContextProvider = ({ children }) => {
  const [currentClient, setCurrentClient] = useState(
    JSON.parse(localStorage.getItem("current_client_info") || null)
  );
  const [loading, setLoading] = useState(false);
  const [currentClientID, setcurrentClientID] = useState(0);

  //login function
  const loginClient = async (formData) => {
    const res = await axiosInstance.post("auth-client/login", formData);

    setCurrentClient(res.data.otherDetails);
  };

  useEffect(() => {
    localStorage.setItem("current_client_info", JSON.stringify(currentClient));
  }, [currentClient]);

  useEffect(() => {
    setcurrentClientID(currentClient && currentClient.client_id);
  }, [currentClient]);

  //handle logout
  const logout = () => {
    setLoading(true);
    try {
      const res = axiosInstance.post("auth-client/logout");

      window.localStorage.removeItem("current_client_info");
      setCurrentClient(null);

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
    <ClientContext.Provider
      value={{
        currentClient,
        setCurrentClient,
        loginClient,
        currentClientID,
        logout,
      }}
    >
      {children}
      {loading && (
        <div className="overlay-signin">
          <h6>Logging out</h6>
          <span className="loader"></span>
        </div>
      )}
    </ClientContext.Provider>
  );
};
