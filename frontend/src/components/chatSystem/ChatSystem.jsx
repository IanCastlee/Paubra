import "./ChatSystem.scss";
import { motion } from "framer-motion";
//ICONS
import { CgClose } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";

import imgpp from "../../assets/images/electricianimg.jpg";
import { chat } from "../../chats";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { AuthContext } from "../../context/Authcontext";
import { ClientContext } from "../../context/Clientcontext";
const ChatSystem = ({
  closeChat,
  currentClientID,
  currentWorkerID,
  workerIDidPresent,
}) => {
  const { currentClient } = useContext(ClientContext);
  const { currrentuser } = useContext(AuthContext);

  const [message, setmessage] = useState("");
  const [toggleMessageConversation, settoggleMessageConversation] =
    useState("conversation");
  const sender = 1;

  //URL CHECKING IF ITS IN WORKER PROFILE
  useEffect(() => {
    if (
      window.location.pathname.startsWith("/worker-profile/") &&
      currrentuser === null
    ) {
      settoggleMessageConversation("message");
    }
  }, []);

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentWorkerID || !currentClientID) {
      console.log("Error: Sender ID and Receiver ID are required.");
      return;
    }

    try {
      const res = await axiosInstance.post("message/send-message", {
        receiver_id: currentWorkerID,
        sender_id: currentClientID,
        message: message,
      });
      console.log("RESPONSE : ", res.data);
    } catch (error) {
      if (error.response) {
        console.log("Err : ", error.response.data);
      }
      console.log("Error  : ", error);
    }
  };

  console.log("CurentLoggedIn : ", currentClientID !== null);

  //GET CHATS
  useEffect(() => {
    handleGetChats();
  }, []);
  const handleGetChats = async () => {
    await axiosInstance
      .get("message/get-conversation", {
        // currentLoggedIn: currentClientID !== null ? currentClientID.currentClientID : currrentuser.
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="chat"
      >
        {toggleMessageConversation === "conversation" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="conversation"
          >
            <div className="top">
              <h5>PAUBRA</h5>
            </div>

            <div className="search-container">
              <div className="search-icon-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Username or Skill"
                />

                <button>
                  <IoSearchOutline className="search-icon" />
                </button>
              </div>
            </div>

            <div className="conversation-list">
              <div
                className="list-wrapper"
                onClick={() => settoggleMessageConversation("message")}
              >
                <img src={imgpp} className="pppic" />{" "}
                <div className="name-message">
                  <span className="name">Luis Hermo</span>
                  <p className="message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="list-wrapper">
                <img src={imgpp} className="pppic" />{" "}
                <div className="name-message">
                  <span className="name">Luis Hermo</span>
                  <p className="message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
              </div>

              <div className="list-wrapper">
                <img src={imgpp} className="pppic" />{" "}
                <div className="name-message">
                  <span className="name">Luis Hermo</span>
                  <p className="message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
              </div>

              <div className="list-wrapper">
                <img src={imgpp} className="pppic" />{" "}
                <div className="name-message">
                  <span className="name">Luis Hermo</span>
                  <p className="message">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
              </div>
            </div>
          </motion.div>
        )}

        {toggleMessageConversation === "message" && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="container"
          >
            <div className="top">
              <div className="left">
                <span
                  className="btn-conversation"
                  onClick={() => setshowConversation(true)}
                >
                  <MdOutlineKeyboardArrowLeft
                    className="show-icon"
                    onClick={() => settoggleMessageConversation("conversation")}
                  />
                  PAUBRA
                </span>
              </div>
              <div className="right" onClick={closeChat}>
                <CgClose className="menu-icon" />
              </div>
            </div>

            <div className="content">
              {chat &&
                chat.map((c) => (
                  <div
                    key={c.id}
                    className={`chat-card ${
                      c.sender === sender ? "user" : "other"
                    }`}
                  >
                    <div className="profile-chat">
                      {sender === c.sender && (
                        <img className="pp" src={imgpp} alt="" />
                      )}

                      <div className="chat-time">
                        <p
                          className={`chat-message  ${
                            c.sender === sender ? "user" : "other"
                          }`}
                        >
                          {c.message}
                        </p>
                        <span
                          className={`time ${
                            c.sender === sender ? "user" : "other"
                          }`}
                        >
                          Tue, 3:00pm
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Message"
                  onChange={(e) => setmessage(e.target.value)}
                />
              </div>

              <button className="btn-send" onClick={handleSubmit}>
                <IoSendSharp className="send-icon" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ChatSystem;
