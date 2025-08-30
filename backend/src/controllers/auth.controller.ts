import { Request, Response } from "express";
import registerUser from "../services/auth/register.user.js";
import { verifyEmail } from "../services/auth/verify.js";
import { loginUser } from "../services/auth/login.service.js";
import { forgotPassword } from "../services/auth/forgot-password.service.js";
import { resetPassword } from "../services/auth/reset.service.js";
import { userProfile } from "../services/auth/profile.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

const TAG = "auth.controller : ";
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, surename } = req.body;
    const result = await registerUser(email, password, name, surename);
    res.status(201).json(result);
  } catch (err: any) {
    // Hata mesajlarını yakala
    const message = err.message || "Sunucu hatası";
    res.status(400).json({ message: message });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const result: any = verifyEmail(token);
    res.send(result.message);
  } catch (err) {
    res.status(400).json({ error: "Token geçersiz veya süresi dolmuş" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    if (result.status) {
      res.status(201).json({
        message: "Giriş başarılı ✅",
        token: result.token,
        user: result.user,
      });
    } else {
      res.status(401).json({
        message: result.message,
        token: null,
        user: null,
      });
    }
  } catch (err: any) {
    // Hata mesajlarını yakala
    const message = err.message || "Sunucu hatası";
    res.status(400).json({
      message: "Sunucu hatası",
      token: null,
      user: null,
    });
  }
};

export const forgot = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    if (result.status) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (err: any) {
    res.status(400).json({ message: "Sunucu Hatası" });
  }
};

export const reset = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const result = await resetPassword(token, password);
    res.status(201).json({ message: result.message });
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};

export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const result = await userProfile(req.user.id);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err });
  }
};
