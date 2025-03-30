import "./Signin.scss";
import { useNavigate } from "react-router-dom";

//IMAGES and  ICONS
import logo from "../../../assets/icon/PAUBRA (5).png";
import logo2 from "../../../assets/icon/PAUBRA (4).png";
//
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/Authcontext";

const Signin = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [showLoader, setshowLoader] = useState(false);

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

    setshowLoader(true);

    try {
      await login(form);
      window.location.href = `/worker-profile/${currrentuser.worker_id}`;
    } catch (error) {
      console.log("Error: ", error);
      setTimeout(() => {
        setshowLoader(false);
      }, 3000);
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
              <div className="mobile-added-img">
                <img src={logo2} alt="" />
              </div>
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
              <div className="mobile-added-no-acc">
                <span>
                  Don't have an account ?{" "}
                  <strong onClick={() => navigate("/auth/signup")}>
                    Sign Up
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <IoIosCloseCircleOutline
          className="close-icon"
          onClick={() => navigate(-1)}
        />
      </div>
      {showLoader && (
        <div className="overlay-signin">
          <span>Please wait...</span>
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default Signin;
