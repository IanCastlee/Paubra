import { query } from "express";
import { db } from "../databaseConnection.js";

//SEND MESSAGE
export const sendMessage = (req, res) => {
  if (!req.body.sender_id || !req.body.receiver_id) {
    return res
      .status(400)
      .json({ error: "Sender ID and Receiver ID are required" });
  }

  const checkIfThereIsAConversation =
    "SELECT * FROM tbl_conversation WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)";

  db.query(
    checkIfThereIsAConversation,
    [
      req.body.sender_id,
      req.body.receiver_id,
      req.body.receiver_id,
      req.body.sender_id,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (data.length === 0) {
        // no conversation exists, create a new one
        const insertConversation =
          "INSERT INTO tbl_conversation(`user_1`,`user_2`) VALUES (?, ?)";
        db.query(
          insertConversation,
          [req.body.sender_id, req.body.receiver_id],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            // get the new conversation ID
            const conversationId = result.insertId;
            const insertMessage =
              "INSERT INTO tbl_chats (`sender_id`, `conversation_id`, `receiver_id`, `message`, `sent_time`) VALUES (?, ?, ?, ?, NOW())";

            db.query(
              insertMessage,
              [
                req.body.sender_id,
                conversationId,
                req.body.receiver_id,
                req.body.message,
              ],
              (err, result) => {
                if (err) {
                  return res
                    .status(500)
                    .json({ error: "Internal server error", details: err });
                }
                return res
                  .status(200)
                  .json({ message: "Message sent successfully" });
              }
            );
          }
        );
      } else {
        // If conversation already exists, use its ID
        const conversationId = data[0].conversation_id;
        const insertMessage =
          "INSERT INTO tbl_chats (`sender_id`, `conversation_id`, `receiver_id`, `message`, `sent_time`) VALUES (?, ?, ?, ?, NOW())";

        db.query(
          insertMessage,
          [
            req.body.sender_id,
            conversationId,
            req.body.receiver_id,
            req.body.message,
          ],
          (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Internal server error", details: err });
            }
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
export const getConversation = (req, res) => {
  const getConversation = "SELECT * FROM tbl_conversation";
};

//GET CHATS
export const getMessage = (req, res) => {};
