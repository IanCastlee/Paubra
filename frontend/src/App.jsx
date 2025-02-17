import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Workers from "./pages/worker/Workers";
import Workerprofile from "./workerprofile/Workerprofile";
import Authlayout from "./pages/authlayout/Authlayout";
import Signin from "./pages/authlayout/signin/Signin";
import Signup from "./pages/authlayout/signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker/:skill" element={<Workers />} />
        <Route path="/worker-profile/:userid" element={<Workerprofile />} />

        <Route path="/auth" element={<Authlayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
