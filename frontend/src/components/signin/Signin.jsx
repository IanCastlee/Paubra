import { Children, useContext, useEffect, useState } from "react";
import Signup from "../signup/Signup";
import "./signin.scss";

//icons
import { IoCloseOutline } from "react-icons/io5";
import axiosInstance from "../../axios";
import { AuthContext } from "../../context/Authcontext";

//IMAGES
import bulusanbgimg from "../../assets/images/blsnimgbg.jpg";
import axios from "axios";
import purokData from "../../static_data/Address";

const Signin = ({ close }) => {
  console.log(purokData);
  const { login } = useContext(AuthContext);

  //showSignUpForm
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const [barangayList, setBarangayList] = useState([]);
  const [selectedBaranagay, setSelecetdBaranagay] = useState("");
  const [selectedStreet, setStreet] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://psgc.cloud/api/cities-municipalities/0506204000/barangays")
  //     .then((response) => {
  //       setBarangayList(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("error : ", error);
  //     });
  // }, []);

  // const purok = puroksInBulusan.find((b) => b.barangay === selectedBaranagay);
  console.log(selectedBaranagay);
  return (
    <>
      {!showSignUpForm ? (
        <div className="sign-in">
          <div className="top">
            <span>Sign In to Paubra</span>
            <IoCloseOutline className="icon-close" onClick={close} />
          </div>
          <div className="dont-have-acc">
            Don't have an account?{" "}
            <strong onClick={() => setShowSignUpForm(true)}>Sign Up</strong>
          </div>

          <div className="forms">
            <select
              name=""
              onChange={(e) => setSelecetdBaranagay(e.target.value)}
            >
              <option value="">Select Barangay</option>
              {purokData &&
                Object.keys(purokData).map((purok) => (
                  <option value={purok}>{purok}</option>
                ))}
            </select>

            <select name="" disabled={!selectedBaranagay}>
              <option value="">Select Purok/Street</option>

              {selectedBaranagay &&
                purokData[selectedBaranagay].map((p, index) => (
                  <option key={index} value={index}>
                    {p}
                  </option>
                ))}
            </select>
          </div>

          <div className="button-wrapper">
            <button className="btn-sign-in">Sign In</button>
          </div>
        </div>
      ) : (
        <Signup close={() => setShowSignUpForm(false)} />
      )}
      <div className="sign-in-overlay">
        {" "}
        <img
          style={{ width: "100%", height: "100%" }}
          src={bulusanbgimg}
          alt=""
        />
      </div>
    </>
  );
};

export default Signin;
