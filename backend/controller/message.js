import { query } from "express";
import { db } from "../databaseConnection.js";

//SEND MESSAGE
export const sendMessage = (req, res, io) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!req.body.sender_id || !req.body.receiver_id) {
    return res
      .status(400)
      .json({ error: "Sender ID and Receiver ID are required" });
  }

  const checkIfThereIsAConversation =
    "SELECT * FROM tbl_conversation WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)";

  db.query(
    checkIfThereIsAConversation,
    [sender_id, receiver_id, receiver_id, sender_id],
    (err, data) => {
      if (err) return res.status(500).json(err);

      let conversationId;

      if (data.length === 0) {
        // No conversation exists, create one
        const insertConversation =
          "INSERT INTO tbl_conversation(`user_1`,`user_2`) VALUES (?, ?)";
        db.query(
          insertConversation,
          [sender_id, receiver_id],
          (err, result) => {
            if (err) return res.status(500).json(err);
            conversationId = result.insertId;
            insertMessage(conversationId);
          }
        );
      } else {
        conversationId = data[0].conversation_id;
        insertMessage(conversationId);
      }

      function insertMessage(conversationId) {
        const messageImage = req.file ? req.file.filename : null;

        const insertMessage =
          "INSERT INTO tbl_chats (`sender_id`, `conversation_id`, `receiver_id`, `message`, `image_message`, `sent_time`) VALUES (?, ?, ?, ?, ?, NOW())";

        db.query(
          insertMessage,
          [sender_id, conversationId, receiver_id, message, messageImage],
          (err, result) => {
            if (err) return res.status(500).json(err);

            // Emit message update to frontend
            io.to(conversationId).emit("receiveMessage", {
              other_profile_picture: req.body.currentLoggedinProfilepic,
              sender_id: Number(sender_id),
              receiver_id,
              message,
              image_message: messageImage ? messageImage : null,
              conversation_id: conversationId,
            });

            return res
              .status(200)
              .json({ message: "Message sent successfully" });
          }
        );
      }
    }
  );
};

//GET CONVERSATION
export const getConversation = (req, res, io) => {
  const currrentLoggedIn = req.query.currrentLoggedIn;

  if (!currrentLoggedIn) {
    console.log("Empty ID");
    return res.status(400).json({ error: "User ID is empty" });
  }

  const getConversation = `SELECT 
    conv.conversation_id, 
    conv.user_1, 
    conv.user_2, 
    ch.message AS latest_message,
    ch.sent_time AS latest_message_time,
    COALESCE(c.username, w.username) AS other_username,
    COALESCE(c.client_id, w.worker_id) AS connected_userid,
    COALESCE(c.profile_picture, w.profile_pic) AS other_profile_picture
    FROM tbl_conversation AS conv
    LEFT JOIN tbl_chats AS ch 
    ON ch.chat_id = (
        SELECT sub_ch.chat_id 
        FROM tbl_chats AS sub_ch 
        WHERE sub_ch.conversation_id = conv.conversation_id  
        ORDER BY sub_ch.sent_time DESC 
        LIMIT 1
    )
LEFT JOIN tbl_clients AS c ON c.client_id = 
    (CASE 
        WHEN conv.user_1 = ? THEN conv.user_2 
        ELSE conv.user_1 
    END)
LEFT JOIN tbl_worker AS w ON w.worker_id = 
    (CASE 
        WHEN conv.user_1 = ? THEN conv.user_2 
        ELSE conv.user_1 
    END)
WHERE conv.user_1 = ? OR conv.user_2 = ?
ORDER BY ch.sent_time DESC;
`;
  db.query(
    getConversation,
    [currrentLoggedIn, currrentLoggedIn, currrentLoggedIn, currrentLoggedIn],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      io.to(currrentLoggedIn).emit("currentConversationData", {
        result: result,
      });

      io.to(currrentLoggedIn).emit("currentConversationData", {
        result: result,
      });

      return res.status(200).json(result);
    }
  );
};

//GET MESSAGES
export const getMessage = (req, res) => {
  const { currentLoggedIn, conversationID } = req.query;
  if (!currentLoggedIn || !conversationID) {
    console.log("Required fields are missing");
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const getChats = `
    SELECT 
        ch.*, 
        c.client_id, 
        w.worker_id, 
        COALESCE(c.username, w.username) AS other_username,
        COALESCE(c.profile_picture, w.profile_pic) AS other_profile_picture
    FROM tbl_chats AS ch
    LEFT JOIN tbl_clients AS c 
        ON (ch.sender_id = ? AND c.client_id = ch.receiver_id) 
        OR (ch.receiver_id = ? AND c.client_id = ch.sender_id)
    LEFT JOIN tbl_worker AS w 
        ON (ch.sender_id = ? AND w.worker_id = ch.receiver_id) 
        OR (ch.receiver_id = ? AND w.worker_id = ch.sender_id)
    WHERE ch.conversation_id = ?`;

  db.query(
    getChats,
    [
      currentLoggedIn,
      currentLoggedIn,
      currentLoggedIn,
      currentLoggedIn,
      conversationID,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal server error", details: err });
      }
      return res.status(200).json(result);
    }
  );
};
