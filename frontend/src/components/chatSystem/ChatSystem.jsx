import "./ChatSystem.scss";
import { motion } from "framer-motion";

//ICONS
import { CgClose } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineFilePresent } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

//image
import likeIcon from "../../assets/icon/like.png";

import { useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios";
import { AuthContext } from "../../context/Authcontext";
import { ClientContext } from "../../context/Clientcontext";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const ChatSystem = ({ closeChat, currentWorkerID }) => {
  const { currentClient } = useContext(ClientContext);
  const { currrentuser } = useContext(AuthContext);
  const currrentLoggedIn = currentClient?.client_id ?? currrentuser?.worker_id;
  const currentLoggedinProfilepic =
    currentClient?.profile_picture ?? currrentuser?.profile_pic;

  const [loader, setloader] = useState(false);
  const [clickedUserIDToChat, setClickedUserIDToChat] = useState(null);
  const [getConversation, setgetConversation] = useState([]);
  const [message, setmessage] = useState("");
  const [messageFile, setMessageFile] = useState(null);
  const [toggleMessageConversation, settoggleMessageConversation] =
    useState("conversation");
  const [imagePreview, setImagePreview] = useState(null);
  const [clickedConversationID, setclickedConversationID] = useState(null);
  const [chats, setchats] = useState([]);

  const chatContainerRef = useRef(null);

  //AUTO SCROLLDOWN

  // useEffect(() => {
  //   if (!chatContainerRef.current) return;

  //   const chatBox = chatContainerRef.current;
  //   const isNearBottom =
  //     chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight <= 800;

  //   if (isNearBottom) {
  //     chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
  //   }
  // }, [chats]);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    const chatBox = chatContainerRef.current;
    const isNearBottom =
      chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight <= 800;

    if (isNearBottom) {
      requestAnimationFrame(() => {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
      });
    }
  }, [chats]);

  const ScrollDown2 = () => {
    if (!chatContainerRef.current) return;

    const chatBox = chatContainerRef.current;
    chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (
      window.location.pathname.startsWith("/worker-profile/") &&
      !currrentuser
    ) {
      settoggleMessageConversation("message");
    }
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      setloader(true);
      if (!currrentLoggedIn) return;
      try {
        const response = await axiosInstance.get(
          `message/conversation?currrentLoggedIn=${currrentLoggedIn}`
        );

        setgetConversation(response.data);
        setloader(false);
      } catch (error) {
        console.error("Error: ", error);
        setloader(false);
      }
    };
    getConversation();
  }, []);

  //if user click the conversation  the socket will send a conversation ID to backend
  useEffect(() => {
    if (clickedConversationID) {
      getChatsFromClickedConversation();
      socket.emit("joinRoom", clickedConversationID);
    }
  }, [clickedConversationID]);

  //...this is the new message from backend that user sent(it will display realtime)
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setchats((prevChats) => [...prevChats, newMessage]);

      console.log("newMessage : ", newMessage);
    });
    return () => socket.off("receiveMessage");
  }, []);

  //current loggedin
  useEffect(() => {
    if (currrentLoggedIn) {
      socket.emit("roomForConersation", currrentLoggedIn);
    }
  }, [currrentLoggedIn]);

  //upadate the conversation message
  useEffect(() => {
    socket.on("receiveMessage", (newConversation) => {
      setgetConversation((prevconversations) =>
        prevconversations.map((conversation) =>
          conversation.conversation_id === newConversation.conversation_id
            ? {
                ...conversation,

                latest_message:
                  newConversation.image_message === null
                    ? newConversation.message
                    : "Sent a photo",
              }
            : conversation
        )
      );
    });

    return () => socket.off("receiveMessage");
  }, []);

  //SEND MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("currentLoggedinProfilepic", currentLoggedinProfilepic);
      formData.append("sender_id", currrentLoggedIn);
      formData.append("receiver_id", clickedUserIDToChat);
      formData.append("message", message);

      if (messageFile) {
        formData.append("messageImage", messageFile);
      }

      const res = await axiosInstance.post("message/send-message", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImagePreview(null);
      // socket.emit("sendMessage", res.data);
      setmessage("");
      setMessageFile(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //SEND LIKE ()
  const handleSubmitLike = async (likeMessage) => {
    try {
      const res = await axiosInstance.post("message/send-message", {
        currentLoggedinProfilepic: currentLoggedinProfilepic,
        sender_id: currrentLoggedIn,
        receiver_id: clickedUserIDToChat,
        message: likeMessage,
      });
      console.log(" res.data : ", res.data);
      socket.emit("sendMessage", res.data);
      setmessage("");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMessageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getChatsFromClickedConversation = async () => {
    try {
      const res = await axiosInstance.get(
        `message/chats?currentLoggedIn=${currrentLoggedIn}&conversationID=${clickedConversationID}`
      );
      setchats(res.data);
    } catch (error) {
      console.error("Error fetching chats: ", error);
    }
  };

  return (
    <motion.div className="chat">
      {toggleMessageConversation === "conversation" && (
        <div className="conversation">
          <div className="top">
            <h5>PAUBRA</h5>
          </div>
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
          <div className="conversation-list">
            {getConversation.map((convo) => (
              <div
                key={convo.conversation_id}
                className="list-wrapper"
                onClick={() => {
                  settoggleMessageConversation("message");
                  setclickedConversationID(convo.conversation_id);
                  setClickedUserIDToChat(convo.connected_userid);
                }}
              >
                <img
                  src={`http://localhost:8080/upload/${convo.other_profile_picture}`}
                  className="pppic"
                />
                <div className="name-message">
                  <span className="name">{convo.other_username}</span>
                  <p className="message">{convo.latest_message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {toggleMessageConversation === "message" && (
        <div className="container">
          <div className="top">
            <span
              className="btn-conversation"
              onClick={() => settoggleMessageConversation("conversation")}
            >
              <MdOutlineKeyboardArrowLeft className="show-icon" /> PAUBRA{" "}
            </span>

            <div className="icon-right-wrapper">
              <IoIosArrowDown onClick={ScrollDown2} className="menu-icon" />
              {/* <CgClose className="menu-icon" onClick={closeChat} /> */}
            </div>
          </div>

          <div className="content" ref={chatContainerRef}>
            {chats.map((c) => (
              <div
                key={c.message_id}
                className={`chat-card ${
                  c.sender_id === currrentLoggedIn ? "other" : "user"
                }`}
              >
                <div className="profile-chat">
                  {currrentLoggedIn !== c.sender_id && (
                    <img
                      className="pp"
                      src={`http://localhost:8080/upload/${c.other_profile_picture}`}
                      alt="Profile"
                    />
                  )}
                  <div className="chat-time">
                    {c.message && (
                      <p
                        className={`chat-message ${
                          Number(c.sender_id) !== currrentLoggedIn
                            ? "user"
                            : "other"
                        } ${c.message === "😛" ? "like-message" : ""}`}
                      >
                        {c.message}
                      </p>
                    )}

                    {c.image_message && (
                      <img
                        className={`image-message ${
                          c.sender_id !== currrentLoggedIn ? "user" : "other"
                        }`}
                        src={`http://localhost:8080/upload/${c.image_message}`}
                        alt="Sent Image"
                      />
                    )}

                    <span
                      className={`time ${
                        c.sender_id !== currrentLoggedIn ? "user" : "other"
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
            <input
              type="file"
              id="file-data"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-data">
              <MdOutlineFilePresent className="file-icon" />
            </label>
            <div className="input-wrapper">
              {imagePreview && (
                <div className="preview-container">
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="preview-image"
                  />
                </div>
              )}
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
            </div>{" "}
            {message === "" && messageFile === null ? (
              <img
                src={likeIcon}
                className="btn-like"
                alt="btn-like"
                onClick={() => handleSubmitLike("😛")}
              />
            ) : (
              <button
                // disabled={message === ""}
                // className={`btn-send ${message === "" ? "nullInputField" : ""}`}
                className="btn-send"
                onClick={handleSubmit}
              >
                <IoSendSharp
                  className={`send-icon ${
                    message === "" ? "nullInputField" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatSystem;
