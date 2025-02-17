import "./Signin.scss";
import { useNavigate } from "react-router-dom";

//IMAGES and  ICONS
import logo from "../../../assets/icon/Paubra-removebg-preview.png";
//
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/Authcontext";

const Signin = () => {
  const { login, currrentuser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setform((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      navigate(`/worker-profile/${currrentuser.worker_id}`);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className="_signin">
        <div className="signin-container">
          <div className="siginin-left">
            <img src={logo} alt="" />
            <h1>Create your Paubra Account</h1>
            <button onClick={() => navigate("/auth/signup")}>Sign Up</button>
          </div>
          <div className="signin-right">
            <div className="signin-right-top">
              <h3>Sign In your Paubra Accout</h3>
            </div>
            <div className="signin-rigth-form">
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                  value={form.username}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="passwprd">Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={form.password}
                />
              </div>{" "}
              <button onClick={handleSignIn}>Sign In</button>
            </div>
          </div>
        </div>

        <IoIosCloseCircleOutline
          className="close-icon"
          onClick={() => navigate(-1)}
        />
      </div>
    </>
  );
};

export default Signin;
