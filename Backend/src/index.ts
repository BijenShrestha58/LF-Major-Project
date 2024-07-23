import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config";

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

app.listen(config.port, () => {
  console.log(`Server started listening on port: ${config.port}`);
});
