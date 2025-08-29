import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Kullanıcı Bulunamadı.");

    if (!user.verified) {
      return {
        status: 0,
        message:
          "E-posta doğrulanmadı. Giriş için öncelikle e-postanı doğrula!",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return {
        status: 0,
        message: "Yanlış şifre!",
      };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });
    return { status: 1, message: "Giriş başarılı ✅", token, user };
  } catch (err: any) {
    return { status: 0, message: "Giriş başarısız. " + err };
  }
};
export default loginUser;
