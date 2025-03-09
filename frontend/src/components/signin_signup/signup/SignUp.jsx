import "./SignUp.scss";
import { useNavigate } from "react-router-dom";

//IMAGES and  ICONS
import logo from "../../../assets/icon/PAUBRA (5).png";
import permitimg from "../../../assets/images/card.png";
import certifimg from "../../../assets/images/certificate.png";
import addphoto from "../../../assets/images/add-photo.png";
//
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";
import { purokData } from "../../../static_data/Address";
import Toast from "../../toastNotification/Toast";

const SignUp = () => {
  const navigate = useNavigate();

  //FORM CONTROL
  const [showForm, setshowForm] = useState(1);
  const [errMessage, setErrMessage] = useState("");
  const [messageFromBackEnd, setMessageFromBackEnd] = useState({
    message: "",
    messageType: "",
  });
  const [showToastNotification, setshowToastNotification] = useState(false);

  //skills
  const skills = [
    "Electrician",
    "Welder",
    "Plumber",
    "Carpenter",
    "Mechanic",
    "Software Developer",
    "Graphic Designer",
    "Chef",
    "Driver",
    "Photographer",
    "Content Writer",
  ].sort();

  const [otherSkill, setotherSkill] = useState([]);
  const [municipality, setmunicipality] = useState("");
  const [barangay, setbarangay] = useState("");
  const [purok, setpurok] = useState("");

  const [data, setdata] = useState({
    fullname: "",
    bday: "",
    gender: "",
    profile: "",
    certificate: "",
    username: "",
    password: "",
    cPassword: "",
  });

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrMessage("");
    setdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //handleFileChange
  const handleFileChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.files[0] });
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.cPassword) {
      setErrMessage("Password and Confirm Password do not match");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("address", purok + ", " + barangay + " " + municipality);
    formData.append("bday", data.bday);
    formData.append("gender", data.gender);
    formData.append("profile_pic", data.profile);
    formData.append("certificate", data.certificate);
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await axiosInstance.post(
        "auth-client/register",
        formData,
        {
          headers: { "Content-Type": "multipart/formdata" },
        }
      );
      setshowToastNotification(true);
      console.log(response.data.message);
      setMessageFromBackEnd({
        message: response.data.message,
        messageType: "success",
      });

      setTimeout(() => {
        setMessageFromBackEnd({ message: "", messageType: "" });
        setshowToastNotification(false);
      }, 3000);
    } catch (error) {
      if (error.response) {
        console.log("Error : ", error.response.data.error);

        setshowToastNotification(true);
        setMessageFromBackEnd({
          message: error.response.data.error,
          messageType: "error",
        });

        setTimeout(() => {
          setshowToastNotification(false);
          setMessageFromBackEnd({ message: "", messageType: "" });
        }, 3000);
      } else {
        console.log("Server Error");
      }
    }
  };
  return (
    <>
      <div className="_signin">
        <div className="signin-container">
          <div className="siginin-left">
            <img src={logo} alt="" />
            <h1>Sign In To Your Account</h1>
            <button onClick={() => navigate("/auth/signin-client")}>
              Sign In
            </button>
          </div>
          <div className="signin-right">
            <div className="signin-right-top">
              <h3>
                {showForm === 1
                  ? "Let's Create your Account"
                  : showForm === 2
                  ? "Your Skills"
                  : showForm === 3
                  ? "Attach your Certificates"
                  : showForm === 4
                  ? "Upload Photo"
                  : showForm === 5
                  ? "Credentials"
                  : "Let's Create your Account"}
              </h3>
            </div>
            {showForm === 1 && (
              <div className="signin-rigth-form1">
                <div className="input-wrapper">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="Fullname"
                    name="fullname"
                    onChange={handleChange}
                    value={data.fullname}
                  />
                </div>
                <div className="input-wrapper-address">
                  <label htmlFor="">Address</label>

                  <div className="municipality-wrapper">
                    <label htmlFor="">Municipality</label>
                    <select onChange={(e) => setmunicipality(e.target.value)}>
                      <option value="">Select Municipality</option>

                      {purokData &&
                        Object.keys(purokData).map((municipality, index) => (
                          <option key={index} value={municipality}>
                            {municipality}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="brgy-purok-wrapper">
                    <div className="brgy-wrapper">
                      <label htmlFor="brgy">Barangay</label>
                      <select
                        name="barangay"
                        onChange={(e) => setbarangay(e.target.value)}
                        disabled={!municipality}
                      >
                        <option value="">Select Barangay</option>

                        {municipality &&
                          purokData[municipality] &&
                          Object.keys(purokData[municipality]).map(
                            (brgy, index) => (
                              <option key={index} value={brgy}>
                                {brgy}
                              </option>
                            )
                          )}
                      </select>
                    </div>

                    <div className="purok-wrapper">
                      <label htmlFor="purok">Purok</label>
                      <select
                        onChange={(e) => setpurok(e.target.value)}
                        disabled={!barangay}
                      >
                        <option value="">Select Street/Purok</option>
                        {barangay &&
                          purokData[municipality][barangay].map(
                            (prk, index) => (
                              <option key={index} value={prk}>
                                {prk}
                              </option>
                            )
                          )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="input-wrapper">
                  <label htmlFor="bdate">Birthdate</label>
                  <input
                    type="date"
                    id="bdate"
                    name="bday"
                    onChange={handleChange}
                  />
                </div>

                <div className="gender-wrapper">
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      name="gender"
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      name="gender"
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
                <button className="btn-continue" onClick={() => setshowForm(3)}>
                  Continue
                </button>

                <div className="mobile-added-no-acc">
                  <span>
                    Already have an account ?{" "}
                    <strong onClick={() => navigate("/auth/signin-client")}>
                      Sign In
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {showForm === 3 && (
              <div className="signin-rigth-form3">
                <div className="profilepic-wrapper">
                  <div className="profilepic">
                    <label htmlFor="profilepic">
                      Add Profile Picture <br />
                      <p style={{ color: "gray", fontSize: "14px" }}>
                        (Make sure to use your real photo so that the admin can
                        approve your application request quickly.)
                      </p>
                      <img
                        src={addphoto}
                        alt=""
                        id="profilepiclabel"
                        style={{
                          width: "120px",
                          height: "120px",
                          marginTop: "30px",
                          marginLeft: "150px",
                        }}
                      />
                    </label>

                    <input
                      type="file"
                      id="profilepic"
                      name="profile"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="certificate-wrapper">
                  <div className="permit">
                    <label htmlFor="certificate">
                      Any Valid ID <br />
                      <p style={{ color: "gray", fontSize: "12px" }}>
                        (Click on the image below to attach your file)
                      </p>
                      <img id="permitlabel" src={permitimg} alt="" />
                    </label>
                    <input
                      type="file"
                      id="certificate"
                      name="certificate"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(1)}>
                    Back
                  </button>
                  <button
                    className="btn-continue"
                    onClick={() => setshowForm(5)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {showForm === 5 && (
              <div className="signin-rigth-form5">
                <div className="input-wrapper">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                  />
                </div>

                <div className="input-wrapper">
                  <span
                    className="error-message"
                    style={{ color: "red", fontSize: "0.625rem" }}
                  >
                    {errMessage}
                  </span>
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="cpassword"> Confirm Password</label>
                  <input
                    type="text"
                    id="cpassword"
                    placeholder="Confirm Password"
                    name="cPassword"
                    onChange={handleChange}
                  />
                </div>

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(3)}>
                    Back
                  </button>
                  <button className="btn-continue" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <IoIosCloseCircleOutline
          className="close-icon"
          onClick={() => navigate(-1)}
        />
      </div>

      {showToastNotification && (
        <Toast
          message={messageFromBackEnd.message}
          messageType={messageFromBackEnd.messageType}
        />
      )}
    </>
  );
};

export default SignUp;
