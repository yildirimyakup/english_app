import express from "express";
import {
  addSingleWord,
  findWord,
  getAllWord,
  uploadFile,
  updateWord,
  deleteWord,
  exportJson,
  exportJsonUserWord,
} from "../controllers/word.controller.js";
import { upload } from "../config/multer.config.js";

const router = express.Router();

//POST
router.post("/add/single", addSingleWord);
router.post("/upload-audio", upload.single("audio"), uploadFile);

//GET
router.get("/", getAllWord); // Tüm kelimeler
router.get("/:id", findWord); // Tek kelime getir
router.get("/export/json", exportJson);

//PUT
router.put("/:id", updateWord);

//DELETE
router.delete("/:id", deleteWord);

export default router;
