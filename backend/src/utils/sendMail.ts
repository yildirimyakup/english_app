import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    secure: true,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // TLS ayarları için ek bir kurala gerek yok.
  });

  await transporter.sendMail({
    from: `"English App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
