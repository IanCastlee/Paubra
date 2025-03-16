import "./Workerprofile.scss";
import LazyLoader from "../components/lazyLoader/LazyLoader";
import placeholderImage from "../assets/icon/placeholder_img.png";
// IMAGES
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
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

// DUMMY DATA
import { projects } from "../dummyproj";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import ChatSystem from "../components/chatSystem/ChatSystem";
import MessageToaster from "../components/messageToaster/MessageToaster";
import { ClientContext } from "../context/Clientcontext";

const Workerprofile = () => {
  const { currrentuser } = useContext(AuthContext);
  const { currentClientID } = useContext(ClientContext);
  const _worker_id = useParams();

  console.log("CurrentUser INOFO : ", currrentuser);

  const [visitWorker, setvisitWorker] = useState([]);
  const [closeChat, setcloseChat] = useState(false);
  const [messageToaster, setmessageToaster] = useState(false);

  setTimeout(() => {
    setmessageToaster(false);
  }, 5000);

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

  // SCROLL UP FUNCTION (SCROLL INTO VIEW)
  const [fixed, setfixed] = useState(false);
  const scrollUp = () => {
    setfixed(true);
  };

  //FORM DATA (about me)
  useEffect(() => {
    setaboutme(visitWorker.about_me || "");
  }, [visitWorker]);

  const [showSendAboutBtn, setshowSendAboutBtn] = useState(false);
  const [showEditAboutBtn, setshowEditAboutBtn] = useState(true);
  const [aboutme, setaboutme] = useState(visitWorker.about_me || "");

  //loader
  const [showLoader, setshowLoader] = useState(false);

  const handleUpdateAboutMe = async (e) => {
    e.preventDefault();

    setshowLoader(true);

    const aboutmeData = new FormData();
    aboutmeData.append("aboutme", aboutme);
    aboutmeData.append("worker_id", visitWorker.worker_id);
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
  const fetchCurrentUserData = () => {
    if (_worker_id === "") {
      console.log("Empty worker ID");
      return;
    }
    axiosInstance
      .get(`worker/worker-info/${_worker_id.userid}`)
      .then((response) => {
        setvisitWorker(response.data);
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
  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  //get length of other_skill
  const otherSkill =
    visitWorker.other_skill && JSON.parse(visitWorker.other_skill);

  useEffect(() => {
    if (currrentuser && currrentuser.worker_id == _worker_id.userid) {
      console.log("EQUAL");
    } else {
      console.log(
        "NOT EQUAL",
        currrentuser && currrentuser.worker_id,
        _worker_id.userid
      );
    }
  }, []);

  return (
    <>
      <div className="worker-profile">
        <div className={`worker-profile-top ${fixed ? "scroll" : ""}`}>
          <div className="reviews-h1-container">
            <div className="main-skill-wrapper">
              <h1>
                {visitWorker.main_skill && visitWorker.main_skill.toUpperCase()}
              </h1>

              <div className="stars">
                <span>Reviews :</span>
                <MdStar className="star-icon" />
                <MdStar className="star-icon" />
                <MdStar className="star-icon" />
                <MdStar className="star-icon" />
                <MdStar className="star-icon" />
              </div>

              <div className="button-wrapper-top">
                <button>Add Review</button>
                <button
                  className="btn-message"
                  onClick={() =>
                    currrentuser && currrentuser !== null
                      ? setcloseChat(true)
                      : currentClientID === null
                      ? setmessageToaster(true)
                      : setcloseChat(true)
                  }
                >
                  <BiSolidMessageRoundedDetail className="message-icon" />
                  Message
                </button>
              </div>
            </div>

            {otherSkill && (
              <div className="other-skills-wrapper">
                <h3>{`Other Skill${otherSkill.length > 0 ? "s" : ""}`}</h3>

                <div className="other-skill-card">
                  {otherSkill &&
                    otherSkill.map((os, index) => (
                      <p key={index}>{os.trim()}</p>
                    ))}
                </div>
              </div>
            )}
          </div>

          <img
            className="img-pp"
            alt="User Profile"
            src={`http://localhost:8080/upload/${visitWorker.profile_pic}`}
          />
        </div>
        <div className={`worker-profile-container ${fixed ? "scroll" : ""}`}>
          <div className="personal-info">
            <h3>{visitWorker.fullname}</h3>
            <span>{visitWorker.address}</span>
            <span>Gender: {visitWorker.gender}</span>
            <span>Age: {visitWorker.age}</span>
          </div>

          {otherSkill && (
            <div className="other-skill">
              <h3>{`Other Skill${otherSkill.length > 0 ? "s" : ""}`}</h3>

              <div className="other-skill-wrapper">
                {otherSkill &&
                  otherSkill.map((os, index) => <p key={index}>{os}</p>)}
              </div>
            </div>
          )}

          <div className="about-worker">
            <textarea
              onChange={(e) => setaboutme(e.target.value)}
              value={aboutme}
              readOnly={showSendAboutBtn ? false : true}
              placeholder="Add info about your self or related to your skill"
            ></textarea>
            {currrentuser &&
            currrentuser.worker_id == _worker_id.userid &&
            showEditAboutBtn ? (
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
          className={`worker-profile-navbar-container ${
            fixed ? "fixedtop" : ""
          }`}
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
            <button
              className="btn-message"
              onClick={() =>
                currrentuser && currrentuser !== null
                  ? setcloseChat(true)
                  : currentClientID === null
                  ? setmessageToaster(true)
                  : setcloseChat(true)
              }
            >
              <BiSolidMessageRoundedDetail className="message-icon" />
              Message
            </button>
            {messageToaster && (
              <MessageToaster message="You need to sign in first" />
            )}
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
                        <LazyLoader
                          src={data.img}
                          placeholder={placeholderImage}
                          alt="Lazy Loaded Image"
                        />
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Facilis deserunt tempore voluptates.
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

      {closeChat && (
        <ChatSystem
          closeChat={() => setcloseChat(false)}
          workerIDidPresent={currrentuser}
          currentClientID={currentClientID}
          currentWorkerID={_worker_id.userid}
        />
      )}
    </>
  );
};

export default Workerprofile;
