import "./Sidebar.scss";

// IMAGES
import userdp from "../../assets/icon/user4.jpg";

//ICONS
import { GoHomeFill } from "react-icons/go";
import { RiFolderWarningFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";

const Sidebar = ({ isVisible, closesidebar }) => {
  return (
    <>
      <div className={`sidebar-mobile ${isVisible ? "show" : ""}`}>
        <div className="profile-top">
          <img src={userdp} alt="Profile" />
          <span>Eyhan Eyhan</span>
        </div>
        <div className="btn-signin-wrapper">
          <button className="btn-signin">Sign In</button>
        </div>
        <hr />

        <div className="button-wrapper">
          <ul>
            <li>
              <GoHomeFill className="icon" /> Home
            </li>
            <li>
              <RiFolderWarningFill className="icon" /> About
            </li>
            <li>
              <FaPhone className="icon" /> Contact
            </li>
          </ul>
        </div>
      </div>

      {isVisible && (
        <div className="sidebar-mobile-overlay" onClick={closesidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
