import express, { Router, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import corsMiddleware from "./middlewares/cors.js";
import auth from "./routes/auth.js";
import word from "./routes/word.js";
import userWord from "./routes/user-word.route.js";
const router = Router();

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World, This is a test." });
});
app.use("/api/auth", auth);
app.use("/api/words", word);
app.use("/api/user-words", userWord);

export default app;
