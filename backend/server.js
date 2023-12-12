import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./connections/database.js";
import { handleLoginPostRequest } from "./controllers/login_controller.js";
import { handleSendOTPPostRequest } from "./controllers/sendOTP_controller.js";
import { handleSignupPostRequest } from "./controllers/signup_controller.js";

const app = express();

dotenv.config();

const host = process.env.HOST || `127.0.0.1`;
const port = process.env.PORT || 6969;

connectDatabase(process.env.DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", handleSignupPostRequest);
app.post("/login", handleLoginPostRequest);
app.post("/sendOTP", handleSendOTPPostRequest);

app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}/`);
});