import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT,
};

export default config;
