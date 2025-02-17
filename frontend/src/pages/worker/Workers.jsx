import "./Worker.scss";

//IMAGES
import userPpP from "../../assets/images/electricianimg.jpg";

//ICONS
import { MdSort } from "react-icons/md";

//REACT HOOKS
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";

const Workers = () => {
  const { skill } = useParams();

  console.log("SKILLL : ", skill);
  //hooks
  const [showSortModal, setshowSortModal] = useState(false);
  const [rowNumber, setrowNumber] = useState(null);

  //getSpecificWorker
  useEffect(() => {
    const getSpecificWorker = () => {
      axiosInstance
        .get(`worker/worker-specific-skill/${skill}`)
        .then((response) => {
          console.log("SKILL FROM BE : ", response.data);
        })
        .catch((error) => {
          console.log("Error : ", error);
          console.log("Error : ", error.response);
          console.log("Error : ", error.response.data);
          console.log(
            "Error : ",
            error.response.data.error || "Something went wrong!"
          );
        });
    };

    getSpecificWorker();
  }, [skill]);

  return (
    <>
      <div className="worker">
        <div className="worker-top-bg">
          <h2>{skill.toUpperCase()}</h2>

          <div className="bot">
            <MdSort
              className="sort-icon"
              onClick={() => setshowSortModal(!showSortModal)}
            />

            {showSortModal && (
              <div className="sort-modal">
                <ul>
                  <li onClick={() => setrowNumber(1)}>1</li>
                  <li onClick={() => setrowNumber(2)}>2</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="workers-container">
          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>

          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>

          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>

          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>

          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>

          <div className={`card  ${rowNumber === 1 ? "one" : "two"} `}>
            <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
              <img src={userPpP} alt="" />
            </div>

            <div className="bot">
              <span className="name">Eyhan</span>
              <span className="address">San Francisco</span>
              <h6>Electrician</h6>

              <Link className="button" to={`/worker-profile/${1}`}>
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Workers;
