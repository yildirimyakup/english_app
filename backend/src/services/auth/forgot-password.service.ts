import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendMail.js";
export const forgotPassword = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { status: 0, message: "Kullanıcı bulunamadı!" };

    // Reset token üret (1 saat geçerli)
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const resetUrl = `${process.env.BASE_URL}/api/auth/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Reset your password",
      `<h1>Şifre Sıfırlama</h1>
       <p>Yeni şifre belirlemek için aşağıdaki linke tıkla:</p>
       <a href="${resetUrl}">${resetUrl}</a>`
    );

    return { status: 1, message: "Şifre sıfırlama maili gönderildi ✅" };
  } catch (err: any) {
    return { status: 0, message: "Şifre sıfırlama başarısız." + err };
  }
};
