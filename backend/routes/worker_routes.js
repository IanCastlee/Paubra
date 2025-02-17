import express from "express";
import {
  updateAboutMe,
  getWorkerInfo,
  getSkills,
  getSpecSkills,
} from "../controller/worker.js";

const route = express.Router();

route.post("/updateabout", updateAboutMe);
route.get("/worker-info/:worker_id", getWorkerInfo);
route.get("/worker-skills", getSkills);
route.get("/worker-specific-skill/:skill_name", getSpecSkills);

export default route;
