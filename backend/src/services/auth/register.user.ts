import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../../models/User.js";
import send from "../../utils/sendMail.js";

const TAG = "service -> register.user.ts :";
const registerUser = async (
  email: string,
  password: string,
  name: string,
  surename: string
) => {
  // 1. Validation
  if (!email || !password) {
    throw new Error("Email ve şifre zorunludur.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Geçerli bir email giriniz.");
  }

  if (password.length < 8) {
    throw new Error("Şifre en az 8 karakter olmalı.");
  }

  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error("Şifre en az bir büyük harf ve bir rakam içermeli.");
  }

  // 2. Kullanıcı var mı?
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("Bu email ile kayıt mevcut.");
  }

  // 3. Şifre hash
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const hashed = await bcrypt.hash(password, saltRounds);

  // 4. Kullanıcı oluştur
  const user = new User({
    email,
    password: hashed,
    isVerified: false,
    name,
    surename,
  });
  await user.save();

  // 5. JWT oluştur
  const verifyToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  const verifyUrl = `${baseUrl}/api/auth/verify?token=${verifyToken}`;

  // 6. Doğrulama maili gönder
  await send(
    email,
    "Verify your English App account",
    `<h1>Email doğrulama</h1>
     <p>Hesabını doğrulamak için linke tıkla:</p>
     <a href="${verifyUrl}">${verifyUrl}</a>`
  );

  return {
    status: 1,
    message: "Kayıt başarılı. Lütfen emailinizi doğrulayın.",
  };
};
export default registerUser;
