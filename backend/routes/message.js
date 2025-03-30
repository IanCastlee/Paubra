import express from "express";
import { cookieJwtAuth } from "../middleware/auth.js";
import {
  sendMessage,
  getConversation,
  getMessage,
} from "../controller/message.js";

const route = express.Router();

// Export a function that accepts `io`
export default (io) => {
  route.post("/send-message", cookieJwtAuth, (req, res) =>
    sendMessage(req, res, io)
  );
  route.get("/chats", (req, res) => getMessage(req, res, io));
  route.get("/conversation", (req, res) => getConversation(req, res, io));

  return route;
};
