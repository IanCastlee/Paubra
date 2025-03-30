import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Workers from "./pages/worker/Workers";
import Workerprofile from "./workerprofile/Workerprofile";
import Authlayout from "./pages/authlayout/Authlayout";
import Signin from "./pages/authlayout/signin/Signin";
import Signup from "./pages/authlayout/signup/Signup";

import SignUp from "./components/signin_signup/signup/SignUp";
import SignIn from "./components/signin_signup/signin/SignIn";
import Landingpage from "./pages/landingpage/Landingpage";
import { useCallback, useContext, useEffect } from "react";
import axiosInstance from "./axios";
import { ClientContext } from "./context/Clientcontext";
import { AuthContext } from "./context/Authcontext";

const Layout = () => {
  const { setCurrentClient, currentClient } = useContext(ClientContext);
  const { setcurrrentuser, currrentuser } = useContext(AuthContext);
  const location = useLocation();
  const hideNavbarForThisLocation = ["/"];

  //clear local if the token expired
  const checkSession = async () => {
    console.log("AM I RENDERING....?");

    try {
      const res = await axiosInstance.get("token/check-session/", {
        withCredentials: true,
      });
      console.log("Session valid:", res.data);
    } catch (error) {
      if (error.response) {
        console.log(
          "Token expired, clearing local storage NOW!",
          error.response.data.error
        );
        setCurrentClient(null);
        setcurrrentuser(null);
      } else {
        console.log("Server responded with an error:", error.response.status);
        console.log("first : ", error.response.data.errorToken);
        console.log("Network error or server unreachable:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!currentClient && !currrentuser) return;
    checkSession();

    const interval = setInterval(() => {
      checkSession();
    }, 60 * 60 * 1000); //1 minute

    return () => {
      clearInterval(interval);
    };
  }, [currentClient, currrentuser]);

  return (
    <>
      {!hideNavbarForThisLocation.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/worker/:skill" element={<Workers />} />
        <Route path="/worker-profile/:userid" element={<Workerprofile />} />

        <Route path="/auth" element={<Authlayout />}>
          {/* worker */}
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          {/* client */}
          <Route path="signup-client" element={<SignUp />} />
          <Route path="signin-client" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
