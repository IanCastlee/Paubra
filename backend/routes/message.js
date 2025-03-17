import express from "express";
import { cookieJwtAuth } from "../middleware/auth.js";
import {
  sendMessage,
  getConversation,
  getMessage,
} from "../controller/message.js";

const route = express.Router();

route.post("/send-message", cookieJwtAuth, sendMessage);
route.get("/get-message", getMessage);
route.get("/get-conversation", getConversation);

export default route;
