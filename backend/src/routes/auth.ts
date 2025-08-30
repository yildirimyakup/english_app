import { Router } from "express";
import {
  register,
  verify,
  login,
  forgot,
  reset,
  profile,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

console.log("burada");
//POST
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgot);
router.post("/reset-password", reset);

//GET
router.get("/verify", verify);
router.get("/profile", authMiddleware, profile);

export default router;
