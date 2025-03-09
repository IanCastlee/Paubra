import express from "express";

import {
  register_client,
  login_client,
  logout_client,
} from "../controller/auth_client.js";
import multer from "multer";

const route = express.Router();

//SETUP MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "user_registration_images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

route.post(
  "/register",
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "profile_pic", maxCount: 1 },
  ]),
  register_client
);
route.post("/login", login_client);
route.post("/logout", logout_client);

export default route;
