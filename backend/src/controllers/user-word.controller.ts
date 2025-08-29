import { addUserWordService } from "../services/user-word/add-user-word.service.js";
import { getUserWordService } from "../services/user-word/get-user-word.service.js";
import { Request, Response } from "express";
import { updateStrengthService } from "../services/user-word/update-strength.service.js";
import { exportJsonUserWordService } from "../services/user-word/export-json-user-word.service.js";

export const getUserWord = async (req: Request, res: Response) => {
  try {
    const result = await getUserWordService(req.params.userId);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err });
  }
};

export const addUserWord = async (req: Request, res: Response) => {
  const { userId, wordId } = req.body;

  try {
    const result = await addUserWordService(userId, wordId);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err });
  }
};

export const updateStrength = async (req: Request, res: Response) => {
  try {
    const { change } = req.body; // +1 ya da -1
    const result = await updateStrengthService(req.params.id, change);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err });
  }
};

export const exportJsonUserWord = async (req: Request, res: Response) => {
  try {
    const result = await exportJsonUserWordService(req.params.userId);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err });
  }
};
