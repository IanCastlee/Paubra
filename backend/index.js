import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  "/upload",
  express.static(path.join(process.cwd(), "user_registration_images"))
);
app.use("/upload", express.static(path.join(process.cwd(), "message_images")));

// Import routes
import authRoutes from "./routes/authroute.js";
import workerRoutes from "./routes/worker_routes.js";
import authroutes_client from "./routes/authroute_client.js";
import messageRoutes from "./routes/message.js";
import tokenRoute from "./routes/auth_token.js";

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/auth-client", authroutes_client);
app.use("/api/message", messageRoutes(io));
app.use("/api/token", tokenRoute);

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  //...this is the  sent conversation ID/room from frontend
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  //roomForConersation
  // socket.on("roomForConersation", (room) => {
  //   socket.join(room);
  //   console.log(`Join  roomForConersation : ${room}`);
  // });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
