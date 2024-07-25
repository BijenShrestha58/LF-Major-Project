import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed"));
      }
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
