import "./Signup.scss";
import { useNavigate } from "react-router-dom";

//IMAGES and  ICONS
import logo from "../../../assets/icon/PAUBRA (5).png";
import logo2 from "../../../assets/icon/PAUBRA (4).png";
import permitimg from "../../../assets/images/card.png";
import certifimg from "../../../assets/images/certificate.png";
import addphoto from "../../../assets/images/add-photo.png";
//
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axios";

import purokData from "../../../static_data/purokData";
const Signup = () => {
  const navigate = useNavigate();

  const [showLoader, setshowLoader] = useState(false);
  const [succcesMessage, setsucccesMessage] = useState("");

  console.log(purokData);
  //FORM DATA
  const [otherSkills, setOtherSkills] = useState([]);
  const [barangay, setbarangay] = useState("");

  const [purok, setpurok] = useState("");
  const [age, setage] = useState(null);
  const [form, setForm] = useState({
    fullname: "",
    address: "",
    bday: "",
    gender: "",
    main_skill: "",
    other_skills: "",
    profile: null,
    certificate: null,
    proof_id_image: null,
    username: "",
    password: "",
    cPassword: "",
  });

  //handleChange
  const handleChange = (e) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //handleFileChange
  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  //FORM CONTROL
  const [showForm, setshowForm] = useState(1);
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

  const handleSkillToggle = (skill) => {
    if (otherSkills.includes(skill)) {
      setOtherSkills(otherSkills.filter((item) => item !== skill));
    } else {
      setOtherSkills([...otherSkills, skill]);
    }
  };

  //GET AGE BASED ON  BIRTHYEAR
  useEffect(() => {
    let year = new Date(form.bday).getFullYear();

    const currentYear = new Date().getFullYear();
    let age = currentYear - year;
    setage(age);
  }, [form.bday]);

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setshowLoader(true);

    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append(
      "address",
      purok + ", " + barangay + " " + "Bulusan, Sorsogon"
    );
    formData.append("bday", form.bday);
    formData.append("age", age);
    formData.append("gender", form.gender);
    formData.append("main_skill", form.main_skill);
    formData.append("other_skills", JSON.stringify(otherSkills));
    formData.append("username", form.username);
    formData.append("password", form.cPassword);

    if (form.profile) formData.append("profile", form.profile);
    if (form.certificate) formData.append("certificate", form.certificate);
    if (form.proof_id_image)
      formData.append("proof_id_image", form.proof_id_image);

    try {
      const res = await axiosInstance.post("auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTimeout(() => {
        setshowLoader(false);
      }, 3000);
    } catch (error) {
      console.error("Upload failed", error);
      setshowLoader(false);
    }
  };
  const today = new Date();
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  const maxDate = eighteenYearsAgo.toISOString().split("T")[0];
  return (
    <>
      <div className="_signin">
        <div className="signin-container">
          <div className="siginin-left">
            <img src={logo} alt="" />
            <h1>Use your Paubra Account to Sign In</h1>
            <button onClick={() => navigate("/auth/signin")}>Sign In</button>
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
              <div className="mobile-added-img">
                <img src={logo2} alt="" />
              </div>
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
                    value={form.fullname}
                  />
                </div>
                <div className="input-wrapper-address">
                  <label htmlFor="">Address</label>
                  <div className="brgy-purok-wrapper">
                    <div className="brgy-wrapper">
                      <label htmlFor="brgy">Barangay</label>
                      <select
                        name=""
                        id="brgy"
                        onChange={(e) => setbarangay(e.target.value)}
                      >
                        <option value="">Select Barangay</option>
                        {purokData &&
                          Object.keys(purokData).map((brgy) => (
                            <option value={brgy} key={brgy}>
                              {brgy}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="purok-wrapper">
                      <label htmlFor="purok">Purok</label>
                      <select
                        name=""
                        id="purok"
                        onChange={(e) => setpurok(e.target.value)}
                        disabled={!barangay}
                      >
                        <option value="">Select Street/Purok</option>
                        {barangay &&
                          purokData[barangay].map((p, index) => (
                            <option key={index} value={p}>
                              {p}
                            </option>
                          ))}
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
                    value={form.bday}
                    max={maxDate}
                  />
                </div>

                <div className="gender-wrapper">
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={form.gender === "Male"}
                      onChange={handleChange}
                      name="gender"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={form.gender === "Female"}
                      onChange={handleChange}
                      name="gender"
                    />
                    Female
                  </label>
                </div>
                <button className="btn-continue" onClick={() => setshowForm(2)}>
                  Continue
                </button>

                <div className="mobile-added-no-acc">
                  <span>
                    Don't have an account ?{" "}
                    <strong onClick={() => navigate("/auth/signin")}>
                      Sign In
                    </strong>
                  </span>
                </div>
              </div>
            )}

            {showForm === 2 && (
              <div className="signin-rigth-form2">
                <div className="input-wrapper">
                  <label htmlFor="mainskill">Main Skill</label>
                  <input
                    type="text"
                    id="mainskill"
                    placeholder="Main Skill"
                    name="main_skill"
                    onChange={handleChange}
                    value={form.main_skill}
                  />
                </div>

                <div className="other-skill">
                  <span style={{ marginBottom: "10px" }}>Other Skills</span>
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
                </div>

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(1)}>
                    Back
                  </button>
                  <button
                    className="btn-continue"
                    onClick={() => setshowForm(3)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {showForm === 3 && (
              <div className="signin-rigth-form3">
                <div className="certificate-wrapper">
                  <div className="permit">
                    <label htmlFor="certificate">
                      Proof that you are a resident of Bulusan <br />
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

                  <div className="permit">
                    <label htmlFor="proof_id_image">
                      Attach your Work Certificate <br />
                      <p style={{ color: "gray", fontSize: "12px" }}>
                        (Optional)
                      </p>
                      <img id="certifimglabel" src={certifimg} alt="" />
                    </label>

                    <input
                      type="file"
                      id="proof_id_image"
                      name="proof_id_image"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(2)}>
                    Back
                  </button>
                  <button
                    className="btn-continue"
                    onClick={() => setshowForm(4)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {showForm === 4 && (
              <div className="signin-rigth-form4">
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

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(3)}>
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
                    value={form.username}
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    id="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
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
                    value={form.cPassword}
                  />
                </div>

                <div className="button-wrapper">
                  <button className="btn-back" onClick={() => setshowForm(4)}>
                    Back
                  </button>
                  <button className="btn-continue" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </div>

                <div className="mobile-added-no-acc">
                  <span>
                    Don't have an account ?{" "}
                    <strong onClick={() => navigate("/auth/signin")}>
                      Sign In
                    </strong>
                  </span>
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

      {showLoader && (
        <div className="overlay-signin">
          <span>Checking Credentials Availability....</span>
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default Signup;
