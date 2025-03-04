import express from "express";
import multer from "multer";
import { login, logout, register } from "../controller/auth.js";

const route = express.Router();

//Setup Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "user_registration_images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//WORKER REGISTRATION
// multiple Image Upload Fields
route.post(
  "/register",
  upload.fields([
    { name: "proof_id_image", maxCount: 1 },
    { name: "certificate", maxCount: 1 },
    { name: "profile", maxCount: 1 },
  ]),
  register
);

route.post("/login", login);
route.post("/logout", logout);

export default route;
