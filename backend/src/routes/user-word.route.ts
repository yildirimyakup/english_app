import { Router } from "express";
import {
  getUserWord,
  addUserWord,
  updateStrength,
  exportJsonUserWord,
} from "../controllers/user-word.controller.js";
const router = Router();

//GET
router.get("/:userId", getUserWord);
router.get("/:userId/export/json", exportJsonUserWord);

//POST
router.post("/", addUserWord);

//PUT
router.put("/:id/strength", updateStrength);

export default router;
