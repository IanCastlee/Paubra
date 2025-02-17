import "./signup.scss";

import { ToastContainer, toast } from "react-toastify";

import { useEffect, useState } from "react";

//icons
import { IoCloseOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import Signin from "../signin/Signin";
import axiosInstance from "../../axios";

//IMAGES
import bulusanbgimg from "../../assets/images/blsnimgbg.jpg";

const Signup = ({ close }) => {
  //showForm (signup)
  const [showForm_1, setShowForm_1] = useState(true);
  const [showForm_2, setShowForm_2] = useState(false);
  const [showForm_3, setShowForm_3] = useState(false);

  //show SignInForm
  const [showSignInForm, setShowSignInForm] = useState(false);

  //showSelector
  const [showSelector, setShowSelector] = useState(false);

  //emptyField
  const [emptyFullname, setEmptyFullname] = useState(false);
  const [emptyAddress, setEmptyAddress] = useState(false);
  const [emptyBDate, setEmptyBDate] = useState(false);
  const [emptyGender, setEmptyGender] = useState(false);

  const [emptyMainSkill, setEmptyMainSkill] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleSetShowForm_1 = () => {
    setShowForm_1(true);
    setShowForm_2(false);
    setShowForm_3(false);
  };

  const handleSetShowForm_2 = () => {
    if (
      userData.fullname === "" ||
      userData.address === "" ||
      userData.bday === "" ||
      gender === ""
    ) {
      if (userData.fullname === "") {
        setEmptyFullname(true);
      }
      if (userData.address === "") {
        setEmptyAddress(true);
      }
      if (userData.bday === "") {
        setEmptyBDate(true);
      }
      if (gender === "") {
        setEmptyGender(true);
      }

      return;
    }

    setShowForm_1(false);
    setShowForm_2(true);
    setShowForm_3(false);
  };

  const handleSetShowForm_3 = () => {
    if (userData.main_skill === "") {
      setEmptyMainSkill(true);

      return;
    }
    setShowForm_1(false);
    setShowForm_2(false);
    setShowForm_3(true);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  //setUserData
  const [gender, setGender] = useState("");
  const [otherSkills, setOtherSkills] = useState([]);
  const [userData, setUserData] = useState({
    fullname: "",
    address: "",
    bday: "",
    gender: "",
    main_skill: "",
    email: "",
    password: "",
  });

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

  const handleSkillToggle = (skill) => {
    if (otherSkills.includes(skill)) {
      setOtherSkills(otherSkills.filter((item) => item !== skill));
    } else {
      setOtherSkills([...otherSkills, skill]);
    }
  };

  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setEmptyFullname(false);
    setEmptyAddress(false);
    setEmptyBDate(false);
    setEmptyGender(false);
    setEmptyMainSkill(false);
    setEmptyEmail(false);
    setEmptyPassword(false);
  };

  //handleSubmit
  const handleSubmit = async () => {
    if (!userData.email || !userData.password) {
      setEmptyEmail(!userData.email);
      setEmptyPassword(!userData.password);
      return;
    }

    try {
      const dataPayload = {
        fullname: userData.fullname,
        address: userData.address,
        bday: userData.bday,
        gender: userData.gender,
        main_skill: userData.main_skill,
        other_skills: JSON.stringify(otherSkills),
        username: userData.email,
        password: userData.password,
      };

      const res = await axiosInstance.post("auth/register", dataPayload);
      if (res) {
        toast(res.data.message, {
          style: { backgroundColor: "blue", color: "white" },
        });
        setUserData({
          fullname: "",
          address: "",
          bday: "",
          gender: "",
          main_skill: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      if (err) {
        toast(err.response.data.error, {
          style: { backgroundColor: "red", color: "white" },
        });
      }
    }
  };

  //handleShowSignInHideSignUp
  const handleShowSignInHideSignUp = () => {
    setShowSignInForm(true);
  };

  //clikedMainSkill
  const clikedMainSkill = (selected_mskill) => {
    setUserData((prevData) => ({
      ...prevData,
      main_skill: selected_mskill,
    }));
  };

  return (
    <>
      <div className="sign-up">
        <div className="top">
          {!showForm_1 ? (
            <GoArrowLeft
              className="icon-arrow"
              onClick={
                showForm_2
                  ? handleSetShowForm_1
                  : setShowForm_3
                  ? handleSetShowForm_2
                  : ""
              }
            />
          ) : (
            <p>
              Sign Up to <strong>Paubra</strong>
            </p>
          )}

          <IoCloseOutline className="icon-close" onClick={close} />
        </div>

        {showForm_1 && (
          <div className="dont-have-acc">
            Already have an account{" "}
            <strong
              onClick={() => {
                handleShowSignInHideSignUp();
                close;
              }}
            >
              Sign In
            </strong>
          </div>
        )}

        {showForm_1 && (
          <div className="form_1">
            <input
              type="text"
              placeholder="Fullname"
              name="fullname"
              onChange={handleChangeUserData}
              className={`input-field ${emptyFullname ? "shake" : ""}`}
              value={userData.fullname}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={handleChangeUserData}
              className={`input-field ${emptyAddress ? "shake" : ""}`}
              value={userData.address}
            />
            <input
              type="date"
              name="bday"
              onChange={handleChangeUserData}
              className={`input-field ${emptyBDate ? "shake" : ""}`}
              value={userData.bday}
            />

            <div className="gender">
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={handleChange}
                  className={`input-field ${emptyGender ? "shake" : ""}`}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={handleChange}
                  className={`input-field ${emptyGender ? "shake" : ""}`}
                />
                Female
              </label>
            </div>
          </div>
        )}
        {showForm_2 && (
          <div className="form_2">
            <div className="main-skill-wrapper">
              <div className="input-field-main-wrapper">
                <input
                  type="text"
                  placeholder="Main Skill"
                  name="main_skill"
                  onChange={handleChangeUserData}
                  className={`input-field-main ${
                    emptyMainSkill ? "shake" : ""
                  }`}
                  value={userData.main_skill}
                />
              </div>

              {showSelector && (
                <div className="select">
                  {data_skills.length > 0 ? (
                    data_skills.map((ds) => (
                      <>
                        <div className="data-wrapperr" key={ds.main_skill}>
                          <spann onClick={() => clikedMainSkill(ds.main_skill)}>
                            {ds.main_skill}
                          </spann>
                        </div>
                      </>
                    ))
                  ) : (
                    <p>No Data Available</p>
                  )}
                </div>
              )}
            </div>

            <d iv className="other-skill">
              <span>Other Skills</span>
              {skills.length > 0 ? (
                skills.map((s) => (
                  <div key={s} className="skill-item">
                    <label>
                      <input
                        type="checkbox"
                        value={s}
                        checked={otherSkills.includes(s)}
                        onChange={() => handleSkillToggle(s)}
                      />
                      <span className="skill">{s}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p>No Skills Available</p>
              )}
            </d>
          </div>
        )}

        {showForm_3 && (
          <div className="form_3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChangeUserData}
              className={`input-field ${emptyEmail ? "shake" : ""}`}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChangeUserData}
              className={`input-field ${emptyPassword ? "shake" : ""}`}
            />
          </div>
        )}

        <div className="button-wrapper">
          <button
            className="btn-continue"
            onClick={
              showForm_2
                ? handleSetShowForm_3
                : showForm_1
                ? handleSetShowForm_2
                : handleSubmit
            }
          >
            {showForm_3 ? "Submit" : "Continue"}
          </button>
        </div>
      </div>
      <div className="sign-up-overlay">
        <img
          style={{ width: "100%", height: "100%" }}
          src={bulusanbgimg}
          alt=""
        />
      </div>

      {showSignInForm && <Signin close={() => setShowSignInForm(false)} />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Signup;
