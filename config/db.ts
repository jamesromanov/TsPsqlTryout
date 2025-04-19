import { Pool } from "pg";
import env from "dotenv";
env.config();

const pool = new Pool({
  user: process.env.DB_USERNAME!,
  port: +process.env.DB_PORT!,
  host: process.env.DB_HOST!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
});

export default pool;
