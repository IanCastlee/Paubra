import { db } from "../databaseConnection.js";
import bcrypt from "bcryptjs";

export const register_client = (req, res) => {
  const checkIfUsernameExist = "SELECT * FROM tbl_clients WHERE username = ?";
  db.query(checkIfUsernameExist, [req.body.username], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal server error", details: err });
    }
    if (data.length) {
      return res.status(409).json({ error: "Username already exist" });
    }

    //generate password with using salt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Check if files exist
    const profile_picture_file =
      req.files && req.files["profile_pic"]
        ? req.files["profile_pic"][0].filename
        : null;

    const certificate_picture_file =
      req.files && req.files["certificate"]
        ? req.files["certificate"][0].filename
        : null;

    const insert_data =
      "INSERT INTO tbl_clients (`fullname`, `address`, `bday`,`male`,`profile_picture`,`certificate`, `username`, `password`)VALUES(?)";

    const values = [
      req.body.fullname,
      req.body.address,
      req.body.bday,
      req.body.gender,
      profile_picture_file,
      certificate_picture_file,
      req.body.username,
      hashedPassword,
    ];

    db.query(insert_data, [values], (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal server error", details: err });
      }
      return res
        .status(200)
        .json({ message: "Client Registered Successfully" });
    });
  });
};

export const login_client = (req, res) => {
  return res.send("Client Login");
};

export const logout_client = (req, res) => {
  return res.send("Client Registration");
};
