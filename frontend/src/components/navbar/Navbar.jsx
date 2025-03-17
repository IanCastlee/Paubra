import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

// ICONS
import { SlSettings } from "react-icons/sl";
import { RiLogoutBoxLine } from "react-icons/ri";
import { LuCircleUser } from "react-icons/lu";
import { CgMenuRightAlt } from "react-icons/cg";
import logo from "../../assets/icon/PAUBRA (4).png";

//
import Sidebar from "../mobilesidebar/Sidebar";
import { useContext, useState } from "react";
import { ClientContext } from "../../context/Clientcontext";
import ChatSystem from "../chatSystem/ChatSystem";
import { AuthContext } from "../../context/Authcontext";

const Navbar = () => {
  const { currentClient, logout, currentClientID } = useContext(ClientContext);
  const { currrentuser, logoutWorker } = useContext(AuthContext);

  console.log("currentClient", currentClient);
  console.log("currrentuser", currrentuser);

  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDropDown, setShowDropdown] = useState(false);
  const [showDropDown2, setShowDropdown2] = useState(false);
  const [showChat, setshowChat] = useState(false);

  return (
    <>
      <div className="navigation">
        <Link className="logo-wrap" to="/home">
          <img className="imglogo" src={logo} alt="Logo" />
        </Link>

        <ul>
          <li>Home</li>
          <li>Contract</li>
          <li>Notification</li>
          <li onClick={() => setshowChat(true)}>Message</li>

          {currrentuser === null && currentClient === null && (
            <li onClick={() => navigate("auth/signup")}>Join as a Worker</li>
          )}
          {currentClientID !== null && (
            <img
              className="userprofile"
              src={`http://localhost:8080/upload/${currentClient?.profile_picture}`}
              alt=""
              onClick={() => setShowDropdown(!showDropDown)}
            />
          )}

          {/* WORKER */}
          {currrentuser !== null && (
            <img
              className="userprofile"
              src={`http://localhost:8080/upload/${currrentuser?.profile_pic}`}
              alt=""
              onClick={() => setShowDropdown2(!showDropDown2)}
            />
          )}
          {/* WORKER END */}

          {currentClientID !== null ||
            (currrentuser === null && (
              <div className="btn-signin-wrapper">
                <button
                  className="btn-signin"
                  onClick={() => navigate("auth/signin-client")}
                >
                  Sign In
                </button>
              </div>
            ))}

          {showDropDown && (
            <div className="drop-down">
              <div className="drop-down-container">
                <Link className="link">
                  <LuCircleUser className="icon" /> Profile
                </Link>
                <Link className="link">
                  <SlSettings className="icon" /> Setting
                </Link>
                <Link className="link" onClick={logout}>
                  <RiLogoutBoxLine className="icon" /> Logout
                </Link>
              </div>
            </div>
          )}
          {showDropDown2 && (
            <div className="drop-down">
              <div className="drop-down-container">
                {/* <Link className="link">
                  <LuCircleUser className="icon" /> Profile
                </Link> */}
                <Link className="link">
                  <SlSettings className="icon" /> Setting
                </Link>
                <Link className="link" onClick={logoutWorker}>
                  <RiLogoutBoxLine className="icon" /> Logout
                </Link>
              </div>
            </div>
          )}

          {showDropDown && (
            <div
              className="drop-down-overlay"
              onClick={() => setShowDropdown(false)}
              onScroll={() => setShowDropdown(false)}
            ></div>
          )}
          {showDropDown2 && (
            <div
              className="drop-down-overlay"
              onClick={() => setShowDropdown2(false)}
              onScroll={() => setShowDropdown2(false)}
            ></div>
          )}
        </ul>

        <CgMenuRightAlt
          className="menu-icon"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {showSidebar && (
        <Sidebar
          isVisible={showSidebar}
          closesidebar={() => setShowSidebar(false)}
        />
      )}

      {/* CHAT */}
      {showChat && <ChatSystem closeChat={() => setshowChat(false)} />}
    </>
  );
};

export default Navbar;
