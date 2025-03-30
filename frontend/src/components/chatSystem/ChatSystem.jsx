import "./ChatSystem.scss";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../axios";
import { AuthContext } from "../../context/Authcontext";
import { ClientContext } from "../../context/Clientcontext";

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
  const [toggleMessageConversation, settoggleMessageConversation] =
    useState("conversation");
  const [clickedConversationID, setclickedConversationID] = useState(null);
  const [chats, setchats] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    const chatBox = chatContainerRef.current;
    const isNearBottom =
      chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight <= 100;

    if (isNearBottom) {
      chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: "smooth" });
    }
  }, [chats]);

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

  //if user clicked a conversation  the socket will send a conversation ID to backend
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
    });
    return () => socket.off("receiveMessage");
  }, []);

  //SEND MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clickedUserIDToChat || !currrentLoggedIn) return;
    try {
      const res = await axiosInstance.post("message/send-message", {
        currentLoggedinProfilepic: currentLoggedinProfilepic,
        sender_id: currrentLoggedIn,
        receiver_id: clickedUserIDToChat,
        message: message,
      });
      console.log(" res.data : ", res.data);
      socket.emit("sendMessage", res.data);
      setmessage("");
    } catch (error) {
      console.error("Error: ", error);
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
          <div className="search-container">
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
              {" "}
              <MdOutlineKeyboardArrowLeft className="show-icon" /> PAUBRA{" "}
            </span>
            <CgClose className="menu-icon" onClick={closeChat} />
          </div>
          <div ref={chatContainerRef} className="content">
            {chats.map((c) => (
              <div
                key={c.chat_id}
                className={`chat-card ${
                  c.sender_id === currrentLoggedIn ? "other" : "user"
                }`}
              >
                <div className="profile-chat">
                  {currrentLoggedIn !== c.sender_id && (
                    <img
                      className="pp"
                      src={`http://localhost:8080/upload/${c.other_profile_picture}`}
                      alt=""
                    />
                  )}
                  <div className="chat-time">
                    <p
                      className={`chat-message ${
                        c.sender_id !== currrentLoggedIn ? "user" : "other"
                      }`}
                    >
                      {c.message}
                    </p>
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
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
            </div>{" "}
            <button className="btn-send" onClick={handleSubmit}>
              <IoSendSharp className="send-icon" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ChatSystem;
