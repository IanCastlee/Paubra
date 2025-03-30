import "./SignIn.scss";
import { useNavigate } from "react-router-dom";

//IMAGES and  ICONS
import logo from "../../../assets/icon/PAUBRA (5).png";
import logo2 from "../../../assets/icon/PAUBRA (4).png";
//
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../../context/Clientcontext";
import Toast from "../../toastNotification/Toast";

const SignIn = () => {
  const { loginClient } = useContext(ClientContext);
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [messageFromBackEnd, setMessageFromBackEnd] = useState({
    message: "",
    messageType: "",
  });
  const [showToastNotification, setshowToastNotification] = useState(false);

  const [form, setform] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setErrMessage("");
    setform((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //handleSignIn
  const handleSignIn = async (e) => {
    e.preventDefault();

    setShowLoader(true);
    try {
      await loginClient(form);

      setTimeout(() => {
        navigate("/home");
        setMessageFromBackEnd({ message: "", messageType: "" });
        setshowToastNotification(false);

        setShowLoader(false);
      }, 3000);
    } catch (error) {
      if (error.response) {
        setErrMessage(error.response.data.error);
        setShowLoader(false);
      } else {
        console.log("Error:  Server Error");
        setshowToastNotification(true);
        setMessageFromBackEnd({
          message: " Server Error",
          messageType: "error",
        });
        setShowLoader(false);

        setTimeout(() => {
          setMessageFromBackEnd({ message: "", messageType: "" });
          setshowToastNotification(false);
        }, 3000);
        setShowLoader(false);
      }
    }
  };

  return (
    <>
      <div className="_signin">
        <div className="signin-container">
          <div className="siginin-left">
            <img src={logo} alt="" />
            <h1>Create An Account</h1>
            <button onClick={() => navigate("/auth/signup-client")}>
              Sign Up
            </button>
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
                <span
                  className="error-message"
                  style={{ color: "red", fontSize: "0.625rem" }}
                >
                  {errMessage}
                </span>
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
                  <strong onClick={() => navigate("/auth/signup-client")}>
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

        {showToastNotification && (
          <Toast
            message={messageFromBackEnd.message}
            messageType={messageFromBackEnd.messageType}
          />
        )}
      </div>

      {showLoader && (
        <div className="overlay-signin">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default SignIn;
