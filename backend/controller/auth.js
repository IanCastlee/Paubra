import bcrypt from "bcryptjs";
import { db } from "../databaseConnection.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const check_q_username = "SELECT * FROM tbl_worker WHERE username = ?";

  db.query(check_q_username, [req.body.username], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err });
    }
    if (data.length) {
      return res.status(409).json({ error: "Username already taken" });
    }

    //  Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //  Get Uploaded Image Paths
    const proof_id_image = req.files["proof_id_image"]
      ? req.files["proof_id_image"][0].filename
      : null;
    const certificate = req.files["certificate"]
      ? req.files["certificate"][0].filename
      : null;
    const profile = req.files["profile"]
      ? req.files["profile"][0].filename
      : null;

    const insert_data =
      "INSERT INTO tbl_worker(`fullname`, `address`, `bday`,`age`, `gender`, `main_skill`, `other_skill`,  `proof_img`, `certificate_img`, `profile_pic`,`username`, `password`) VALUES (?)";

    const values = [
      req.body.fullname,
      req.body.address,
      req.body.bday,
      req.body.age,
      req.body.gender,
      req.body.main_skill,
      req.body.other_skills,
      proof_id_image,
      certificate,
      profile,
      req.body.username,
      hashedPassword,
    ];

    db.query(insert_data, [values], (err, data) => {
      if (err) {
        console.error("Insert error:", err);
        return res
          .status(500)
          .json({ error: "Database Insert Error", details: err });
      }
      return res.status(200).json({ message: "Registered Successfully" });
    });
  });
};

export const login = (req, res) => {
  const checkIfuserExist = "SELECT * FROM tbl_worker WHERE username =?";
  db.query(checkIfuserExist, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Username not found");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword) {
      return res.status(400).json("Password is incorrect!");
    }

    // const token = jwt.sign({ id: data[0].worker_id }, "secretkey");
    const token = jwt.sign({ id: data[0].worker_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password, worker_id, ...others } = data[0];

    res
      .cookie("accesToken", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV = "production"),
        sameSite: "strict",
      })
      .status(200)
      .json({ worker_id, otherInfo: others });
  });
};

export const logoutWorker = (req, res) => {
  res
    .clearCookie("accesToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Worker has been logged out.");
};
