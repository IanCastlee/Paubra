import "./Headingbg.scss";

//IMAGES
import bgimg from "../../assets/images/homebgimg.png";
import Signin from "../../components/signin/Signin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Headingbg = () => {
  const navigate = useNavigate();
  const [showSignIn, setshowSignIn] = useState(false);
  return (
    <>
      <div className="heading-bg">
        <div className="img-hero-container">
          <div className="hero-wrapper">
            <h1 className="hero">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
              delectus.
            </h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              vitae sit adipisci asperiores unde modi?
            </p>

            <button onClick={() => navigate("/auth/signin")}>
              Sign Up Now
            </button>
          </div>
          <img src={bgimg} alt="" />
        </div>
      </div>

      {showSignIn && <Signin close={() => setshowSignIn(false)} />}
    </>
  );
};

export default Headingbg;
