import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Workers from "./pages/worker/Workers";
import Workerprofile from "./workerprofile/Workerprofile";
import Authlayout from "./pages/authlayout/Authlayout";
import Signin from "./pages/authlayout/signin/Signin";
import Signup from "./pages/authlayout/signup/Signup";

import SignUp from "./components/signin_signup/signup/SignUp";
import SignIn from "./components/signin_signup/signin/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/:skill" element={<Workers />} />
        <Route path="/worker-profile/:userid" element={<Workerprofile />} />

        <Route path="/auth" element={<Authlayout />}>
          {/* worker */}
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          {/* client */}
          <Route path="signup-client" element={<SignUp />} />
          <Route path="signin-client" element={<SignIn />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
