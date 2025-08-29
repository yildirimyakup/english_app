import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

export const resetPassword = async (token: any, password: string) => {
  try {
    if (!token) throw new Error("Token yok!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    if (password.length < 8) {
      throw new Error("Şifre en az 8 karakter olmalı.");
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      throw new Error("Şifre en az bir büyük harf ve bir rakam içermeli.");
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });

    return { message: "Şifre başarıyla güncellendi ✅" };
  } catch (err: any) {
    return new Error(err);
  }
};
