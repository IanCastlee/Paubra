import "./Worker.scss";

//IMAGES
import userPpP from "../../assets/images/electricianimg.jpg";

//ICONS
import { MdSort } from "react-icons/md";
import { RiFileList3Fill } from "react-icons/ri";

//REACT HOOKS
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";

const Workers = () => {
  const { skill } = useParams();

  console.log("SKILLL : ", skill);
  //hooks
  const [loader, setloader] = useState(false);
  const [showSortModal, setshowSortModal] = useState(false);
  const [rowNumber, setrowNumber] = useState(null);
  const [data, setdata] = useState([]);

  //getSpecificWorker
  useEffect(() => {
    let isMounted = true;
    setloader(true);

    const getSpecificWorker = async () => {
      try {
        const response = await axiosInstance.get(
          `worker/worker-specific-skill/${skill}`
        );
        if (isMounted) {
          setdata(response.data);
          setloader(false);
        }
      } catch (error) {
        if (isMounted) {
          console.log("Error:", error);
          setloader(false);
        }
      }
    };

    getSpecificWorker();

    return () => {
      isMounted = false;
    };
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
          {loader ? (
            <span className="loader"></span>
          ) : data.length > 0 ? (
            data.map((d) => (
              <div
                key={d.worker_id}
                className={`card  ${rowNumber === 1 ? "one" : "two"} `}
              >
                <div className={`top  ${rowNumber === 1 ? "one" : "two"} `}>
                  <img
                    src={`http://localhost:8080/upload/${d.profile_pic}`}
                    alt=""
                  />
                </div>

                <div className="bot">
                  <span className="name">{d.username}</span>
                  <span className="address">{d.address}</span>
                  <h6>{d.main_skill}</h6>

                  <Link
                    className="button"
                    to={`/worker-profile/${d.worker_id}`}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">
              <RiFileList3Fill className="no-data-icon" />
              <span> NO DATA RECORD</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Workers;
