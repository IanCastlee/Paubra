import express from "express";
import { cookieJwtAuth } from "../middleware/auth.js";

const route = express.Router();

route.get("/check-session", cookieJwtAuth, (req, res) => {
  res.json({ message: "Authentication successful", user: req.user });
});

export default route;
