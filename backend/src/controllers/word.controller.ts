import { addSingleWordService } from "./../services/words/add-single-word.service.js";
import Word from "../models/Word.js";
import { Request, Response } from "express";
import { findWordById } from "../services/words/find-word-by-id.service.js";
import { uploadFileService } from "../services/words/upload-audio.service.js";
import { updateWordService } from "../services/words/update-word.service.js";
import { deleteWordService } from "../services/words/delete-word.service.js";
import { exportJsonService } from "../services/words/export-json.service.js";

export const getAllWord = async (req: Request, res: Response) => {
  try {
    const words: any = await Word.find();
    res.status(201).json({ words, message: "işlem Başarılı." });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const findWord = async (req: Request, res: Response) => {
  try {
    const result = await findWordById(req.params.id);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};

export const addSingleWord = async (req: Request, res: Response) => {
  try {
    const {
      english,
      turkish,
      level,
      example,
      audio,
      pos,
      tags,
      synonyms,
      antonyms,
      phonetic,
      xpValue,
      frequency,
    } = req.body;

    const word: any = {
      english,
      turkish,
      level,
      example,
      audio,
      pos,
      tags,
      synonyms,
      antonyms,
      phonetic,
      xpValue,
      frequency,
    };
    const result = await addSingleWordService(word);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const result = await uploadFileService(req.file);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};

export const updateWord = async (req: Request, res: Response) => {
  try {
    const updateWord: any = req.body;
    const id: any = req.params.id;
    const result = await updateWordService(updateWord, id);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};
export const deleteWord = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;
    const result = await deleteWordService(id);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};

export const exportJson = async (req: Request, res: Response) => {
  try {
    const result = await exportJsonService();
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};
