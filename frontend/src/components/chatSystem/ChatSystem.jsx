import "./ChatSystem.scss";
import { motion } from "framer-motion";
//ICONS
import { CgClose } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";

import imgpp from "../../assets/images/electricianimg.jpg";
import { chat } from "../../chats";
const ChatSystem = ({ closeChat }) => {
  const sender = 1;

  console.log(chat);
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="chat"
      >
        <div className="container">
          <div className="top">
            <div className="left">
              <span>PAUBRA</span>
            </div>
            <div className="right" onClick={closeChat}>
              <CgClose className="menu-icon" />
            </div>
          </div>

          <div className="content">
            {chat &&
              chat.map((c) => (
                <div
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
              <input type="text" placeholder="Message" />
            </div>

            <button className="btn-send">
              <IoSendSharp className="send-icon" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatSystem;
