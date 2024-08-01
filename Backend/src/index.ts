import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

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

app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
