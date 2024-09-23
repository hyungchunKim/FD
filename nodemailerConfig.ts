import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = async (
  name: string,
  email: string,
  message: string,
) => {
  try {
    const inquire = await transporter.sendMail({
      from: email,
      to: process.env.MAIL_EMAIL,
      subject: name,
      html: message,
    });
    return inquire;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
