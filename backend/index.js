// import { verifyToken } from "./middleware/auth.js";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

// ROUTES
import authRoutes from "./routes/authroute.js";
import workerRoutes from "./routes/worker_routes.js";
import authroutes_client from "./routes/authroute_client.js";
import messageRoutes from "./routes/message.js";

// MIDDLEWARES
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//Serve uploaded images (Make folder public)
app.use(
  "/upload",
  express.static(path.join(process.cwd(), "user_registration_images"))
);

//ROUTES WORKER
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);

//ROUTES CLIENT
app.use("/api/auth-client", authroutes_client);

//ROUTES SEND MESSAGE
app.use("/api/message", messageRoutes);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
