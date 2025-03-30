import "./Sidebar.scss";
import { motion } from "framer-motion";

// IMAGES
import userdp from "../../assets/icon/user4.jpg";

//ICONS
import { GoHomeFill } from "react-icons/go";
import { RiFolderWarningFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { useContext, useState } from "react";
import { ClientContext } from "../../context/Clientcontext";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import ChatSystem from "../chatSystem/ChatSystem";

const Sidebar = ({ isVisible, closesidebar }) => {
  const navigate = useNavigate();
  const { currentClient, currentClientID, logout } = useContext(ClientContext);
  const [showChat, setshowChat] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`sidebar-mobile ${isVisible ? "show" : ""}`}
      >
        {currentClientID !== null && (
          <div className="profile-top">
            <img
              src={`http://localhost:8080/upload/${
                currentClient && currentClient.profile_picture
              }`}
              alt="Profile"
            />
            <span>{currentClient && currentClient.username}</span>
          </div>
        )}

        {currentClientID === null && (
          <div className="btn-signin-wrapper">
            <button
              className="btn-signin"
              onClick={() => navigate("auth/signin-client")}
            >
              Sign In
            </button>
          </div>
        )}

        <hr />

        <div className="button-wrapper">
          <ul>
            <li onClick={() => navigate("auth/signup")}>
              <GrUserWorker className="icon" /> Join as a Worker
            </li>
            <li>
              <GoHomeFill className="icon" /> Home
            </li>
            <li onClick={() => setshowChat(true)}>
              <HiChatBubbleOvalLeftEllipsis className="icon" /> Message
            </li>
            <li>
              <RiFolderWarningFill className="icon" /> About
            </li>
            <li>
              <FaPhone className="icon" /> Contact
            </li>

            {currentClientID !== null && (
              <li onClick={logout}>
                <RiLogoutBoxLine className="icon" /> Logout
              </li>
            )}
          </ul>
        </div>
      </motion.div>

      {isVisible && (
        <div className="sidebar-mobile-overlay" onClick={closesidebar}></div>
      )}

      {/* CHAT BOX */}
      {showChat && <ChatSystem closeChat={() => setshowChat(false)} />}
    </>
  );
};

export default Sidebar;
