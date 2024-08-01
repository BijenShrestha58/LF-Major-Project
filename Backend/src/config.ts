import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

const config = {
  port: parseInt(process.env.PORT, 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiryMS: 3000,
    refreshTokenExpiryMS: 30000,
  },
  database: {
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  bcrypt: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  },
};

export default config;
