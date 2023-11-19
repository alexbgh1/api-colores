import dotenv from "dotenv";
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT}`;

export { API_URL };
