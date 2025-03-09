import { db } from "../databaseConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const checkIfUsserNotExist = "SELECT * FROM tbl_clients WHERE username = ?";
  db.query(checkIfUsserNotExist, [req.body.username], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Interval Server Error", details: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!checkPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ id: result[0].client_id }, "client_secretkey");
    const { password, ...others } = result[0];

    res
      .cookie("clientAccesToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout_client = (req, res) => {
  res
    .clearCookie("clientAccesToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};
