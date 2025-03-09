import "./Headingbg.scss";

//IMAGES
import bgimg from "../../assets/images/homebgimg.png";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/customButton/CustomButton";
const Headingbg = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="heading-bg">
        <div className="img-hero-container">
          <div className="hero-wrapper">
            {/* <h1 className="hero">Find Skilled Workers in Bulusan</h1> */}
            <h1 className="hero">Find Skilled Workers in Bulusan</h1>

            <h3 className="sub-title">
              Discover skilled professionals in Bulusan—plumbers, carpenters,
              electricians, and more—ready to meet your needs.
            </h3>
            <CustomButton
              _style={"submit-button"}
              onclick={() => navigate("/auth/signup-client")}
              label={"Sign In"}
            />
          </div>
          <img src={bgimg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Headingbg;
