import { Link } from "react-router-dom";
import "./Skills.scss";
import { useEffect, useState } from "react";

//ICONS
import { IoSearchOutline } from "react-icons/io5";
import axiosInstance from "../../axios";
import BestWorker from "../../components/bestWorker/BestWorker";

const Skills = () => {
  const skill = "Electrician";

  const [workerskill, setworkerskill] = useState([]);

  const [showFirstHint, setShowFirstHint] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstHint((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getSkills = () => {
      axiosInstance
        .get("worker/worker-skills")
        .then((response) => {
          setworkerskill(response.data);
        })
        .catch((error) => {
          console.log("Error : ", error.reponse);
          console.log("Error : ", error.response.data);
          console.log(
            "Error : ",
            error.reponse.data.error || "Something went wrong"
          );
        });
    };
    getSkills();
  }, []);

  return (
    <div className="skills">
      <div className="search-container">
        <div className="search-icon-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search by skill, location, or name"
          />

          <button>
            <IoSearchOutline className="search-icon" />
          </button>
        </div>
      </div>

      <div className="skills-container">
        {workerskill.length > 0 ? (
          workerskill.map((ws, index) => (
            <Link key={index} className="skill" to={`/worker/${ws.main_skill}`}>
              <span key={ws.main_skill}>{ws.main_skill}</span>
            </Link>
          ))
        ) : (
          <p>No Data yet!</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
