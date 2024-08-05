import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";
import { Server } from "socket.io";

const app = express();

app.use(helmet());

const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the list of allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // If the origin is not allowed, return an error
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

const server = app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const connections = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinedRoom", ({ room, user }) => {
    if (!connections[room]) {
      connections[room] = [];
    }

    if (connections[room].length >= 2) {
      socket.emit("roomFullError", "Room full");
      return;
    }

    if (connections[room].find((item) => item.user === user.id)) return;

    connections[room].push({
      user: user.id,
      hasAttacked: false,
      usedAttack: {},
      socketId: socket.id, // Store the socket ID for easy removal later
    });

    console.log(connections);
    socket.join(room);

    socket.to(room).emit("hello", "hello");

    // Handle disconnection
    socket.on("disconnect", () => {
      if (connections[room]) {
        connections[room] = connections[room].filter(
          (item) => item.socketId !== socket.id
        );
        if (connections[room].length === 0) {
          delete connections[room];
        }
      }
    });
  });

  socket.on("selectMove", (message) => {
    console.log(message);
  });
});
