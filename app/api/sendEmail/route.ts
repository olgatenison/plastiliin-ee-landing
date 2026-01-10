import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phoneNumber, message } =
      await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ваш email
        pass: process.env.EMAIL_PASS, // пароль от email
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "Olga.gushchynaou@gmail.com",
      subject: "Новое сообщение с формы",
      text: `Имя: ${firstName} ${lastName}
        Email: ${email}
        Телефон: ${phoneNumber}
        Сообщение: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      // This ensures that TypeScript knows that 'error' has a 'message' property
      console.error("Ошибка отправки email:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      // If the error is not an instance of 'Error', handle it gracefully
      console.error("Неизвестная ошибка:", error);
      return NextResponse.json(
        { success: false, error: "Неизвестная ошибка" },
        { status: 500 }
      );
    }
  }
}
