import "./Workerprofile.scss";

// IMAGES
import bgdp from "../assets/images/userbg.jpg";
import userdp from "../assets/images/360_F_622221708_Gg16ZdaNSixeaIORq9MuuT4w9VWTkYw4.jpg";

// ICONS
import { TfiHummer } from "react-icons/tfi";
import { GoComment } from "react-icons/go";
import { RiUserShared2Line } from "react-icons/ri";
import { MdStar } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// DUMMY DATA
import { projects } from "../dummyproj";
import { reviews } from "../dummyReviews";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import axiosInstance from "../axios";

const Workerprofile = () => {
  const { currrentuser, setcurrrentuser } = useContext(AuthContext);

  // USEREF
  const scrollRef = useRef(null);

  // HANDLE SHOW CONTENT
  const [showProject, setShowProject] = useState(true);
  const [showReviews, setShowReviews] = useState(false);
  const [showConnected, setShowConnected] = useState(false);

  // HANDLE NAVBAR CLICK
  const _showProjects = () => {
    setShowProject(true);
    setShowReviews(false);
    setShowConnected(false);
    scrollUp();
  };

  const _showReviews = () => {
    setShowProject(false);
    setShowReviews(true);
    setShowConnected(false);
    scrollUp();
  };

  const _showConnected = () => {
    setShowProject(false);
    setShowReviews(false);
    setShowConnected(true);
    scrollUp();
  };

  // SCROLL UP FUNCTION WITH SCROLL INTO VIEW
  const [fixed, setfixed] = useState(false);
  const scrollUp = () => {
    setfixed(true);
  };

  //FORM DATA (about me)
  useEffect(() => {
    setaboutme(currrentuser.about_me || "");
  }, [currrentuser]);

  const [showSendAboutBtn, setshowSendAboutBtn] = useState(false);
  const [showEditAboutBtn, setshowEditAboutBtn] = useState(true);
  const [aboutme, setaboutme] = useState(currrentuser.about_me || "");

  //loader
  const [showLoader, setshowLoader] = useState(false);

  const handleUpdateAboutMe = async (e) => {
    e.preventDefault();

    setshowLoader(true);

    const aboutmeData = new FormData();
    aboutmeData.append("aboutme", aboutme);
    aboutmeData.append("worker_id", currrentuser.worker_id);
    try {
      const res = await axiosInstance.post("worker/updateabout", aboutmeData);
      console.log(res.data.message);
      setshowLoader(false);
      setshowEditAboutBtn(true);
    } catch (error) {
      console.log("Error : ", error.response.data || error);
      setshowLoader(false);
    }
  };

  //FETCH CURRENT USER DATA FROM DB
  useEffect(() => {
    const fetchCurrentUserData = () => {
      axiosInstance
        .get(`worker/worker-info/${currrentuser.worker_id}`)
        .then((response) => {
          console.log(response.data);
          setcurrrentuser(response.data);

          setshowSendAboutBtn(false);
        })
        .catch((error) => {
          console.log("Full Error Object:", error);
          console.log("Error Response:", error.response);
          console.log("Error Data:", error.response?.data);
          console.log(
            "Error Message:",
            error.response?.data?.error || "Something went wrong!"
          );
        });
    };

    fetchCurrentUserData();
  }, [currrentuser.worker_id]);

  //get length of other_skill
  const otherSkill =
    currrentuser.other_skill && JSON.parse(currrentuser.other_skill);

  return (
    <div className="worker-profile">
      <div className={`worker-profile-top ${fixed ? "scroll" : ""}`}>
        <div className="reviews-h1-container">
          <div className="main-skill-wrapper">
            <h1>{currrentuser.main_skill.toUpperCase()}</h1>

            <div className="stars">
              <span>Reviews :</span>
              <MdStar className="star-icon" />
              <MdStar className="star-icon" />
              <MdStar className="star-icon" />
              <MdStar className="star-icon" />
              <MdStar className="star-icon" />
            </div>

            <button>Add Review</button>
          </div>

          {otherSkill && (
            <div className="other-skills-wrapper">
              <h3>{`Other Skill${otherSkill.length > 0 ? "s" : ""}`}</h3>
              {otherSkill &&
                otherSkill.map((os, index) => <p key={index}>{os.trim()}</p>)}
            </div>
          )}
        </div>

        <img
          className="img-pp"
          alt="User Profile"
          src={`http://localhost:8080/upload/${currrentuser.profile_pic}`}
        />
      </div>
      <div className={`worker-profile-container ${fixed ? "scroll" : ""}`}>
        <div className="personal-info">
          <h3>{currrentuser.fullname}</h3>
          <span>{currrentuser.address}</span>
          <span>Gender: {currrentuser.gender}</span>
          <span>Age: {currrentuser.age}</span>
        </div>

        {otherSkill && (
          <div className="other-skill">
            <h3>{`Other Skill${otherSkill.length > 0 ? "s" : ""}`}</h3>

            {otherSkill && otherSkill.map((os) => <p>{os}</p>)}
          </div>
        )}

        <div className="about-worker">
          <textarea
            onChange={(e) => setaboutme(e.target.value)}
            value={aboutme}
            readOnly={showSendAboutBtn ? false : true}
            placeholder="Add info about your self or related to your skill"
          ></textarea>

          {showEditAboutBtn ? (
            <LiaUserEditSolid
              title="Edit"
              className="edit-icon"
              onClick={() => {
                setshowSendAboutBtn(true);
                setshowEditAboutBtn(false);
              }}
            />
          ) : showSendAboutBtn ? (
            showLoader ? (
              <AiOutlineLoading3Quarters className="loader" />
            ) : (
              <MdOutlineSaveAlt
                title="Save"
                style={{ color: "green" }}
                className="edit-icon"
                onClick={handleUpdateAboutMe}
              />
            )
          ) : null}
        </div>
      </div>
      <div
        className={`worker-profile-navbar-container ${fixed ? "fixedtop" : ""}`}
      >
        {" "}
        {/* ref={scrollRef} */}
        <div className={`worker-profile-navbar ${fixed ? "fixedtop" : ""}`}>
          <ul className={fixed ? "fixedtop" : ""}>
            <li onClick={_showProjects}>
              <TfiHummer />
              Projects
            </li>
            <li onClick={_showReviews}>
              <GoComment /> Reviews
            </li>
            <li onClick={_showConnected}>
              <RiUserShared2Line /> Connected
            </li>
          </ul>
          {fixed && (
            <FaAngleDown
              className="down-icon"
              onClick={() => setfixed(false)}
            />
          )}{" "}
        </div>
        <div className="worker-profile-navbar-container-content">
          <div className="content">
            <h3>
              {showProject
                ? "PROJECTS"
                : showReviews
                ? "REVIEWS"
                : showConnected
                ? "CONNECTED"
                : ""}
            </h3>

            {showProject && (
              <div className="user-projects">
                {projects.map((data) => (
                  <div className="card" key={data.id}>
                    <div className="username-desc">
                      <div className="username-datepost">
                        <h6>{data.postby}</h6>
                        <p>January 1, 2025</p>
                      </div>
                      <p>{data.desc}</p>
                    </div>
                    <div className="img-wrapper">
                      <img src={data.img} alt="Project" />
                    </div>

                    <div className="bot">
                      <div className="icon-like">
                        <SlLike />
                        <span>9</span>
                      </div>

                      <div className="icon-dlike">
                        <SlDislike />
                        <span>3</span>
                      </div>
                      <div className="icon-comment">
                        <TfiComment />
                        <span>3</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showReviews && (
              <div className="user-reviews">
                <div className="review-card-container">
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>

                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                  <div className="review-cardd">
                    <div className="user-profile-name">
                      <img src={userdp} alt="User" />
                      <span>Name</span>
                    </div>

                    <div className="star-rate-date">
                      <div className="stars">
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                        <MdStar className="star-icon" />
                      </div>

                      <p>01/03/25</p>
                    </div>

                    <div className="review">
                      <p>
                        Lorem ipsum dolor sit amet consectetur
                        adipisicierrerererettgg rerererere5ng elit. Facilis
                        deserunt tempore voluptates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showConnected && (
              <div className="user-connected">
                <h1>CONNECTED</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workerprofile;
