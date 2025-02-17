import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

// ICONS
import { LiaUserCircle } from "react-icons/lia";
import { CgMenuRightAlt } from "react-icons/cg";
import logo from "../../assets/icon/Paubra-removebg-preview.png";
import Sidebar from "../mobilesidebar/Sidebar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/Authcontext";

const Navbar = () => {
  const { currrentuser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const [showSignin, setshowSignin] = useState(false);

  return (
    <>
      <div className="navigation">
        <Link className="logo-wrap" to="/">
          <img className="imglogo" src={logo} alt="Logo" />
        </Link>

        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Profile</li>

          <LiaUserCircle
            className="user-icon"
            onClick={() =>
              navigate(`/worker-profile/${currrentuser.worker_id}`)
            }
          />
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
    </>
  );
};

export default Navbar;
