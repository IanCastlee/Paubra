import { db } from "../databaseConnection.js";

export const updateAboutMe = (req, res) => {
  const updateAboutMe =
    "UPDATE  tbl_worker SET about_me = ? WHERE worker_id = ?";
  db.query(
    updateAboutMe,
    [req.body.aboutme, req.body.worker_id],

    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: err });
      }
      if (data) {
        return res.status(200).json({ message: "Updated Successfully" });
      }
    }
  );
};

export const getWorkerInfo = (req, res) => {
  const { worker_id } = req.params;

  if (!worker_id) {
    return res.status(400).json({ error: "Worker ID not found!" });
  }

  const fetchUserData = "SELECT * FROM tbl_worker  WHERE worker_id = ?";
  db.query(fetchUserData, [worker_id], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err });
    }
    if (data.length === 0) {
      return res.status(404).json("Worker not found!");
    }

    return res.status(200).json(data[0]);
  });
};

export const getSkills = (req, res) => {
  const getSkills = "SELECT DISTINCT main_skill FROM tbl_worker";
  db.query(getSkills, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Internal Server error", details: err });
    }
    return res.status(200).json(data);
  });
};

export const getSpecSkills = (req, res) => {
  const { skill_name } = req.params;

  const getSkills = "SELECT * FROM tbl_worker WHERE main_skill = ?";
  db.query(getSkills, [skill_name], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Interval Server error!", details: err });
    }

    return res.status(200).json(data);
  });
};
