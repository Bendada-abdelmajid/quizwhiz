import nodemailer, { TransportOptions } from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { Resulte } from "@/utils/types";

interface RequestBody {
  name: string;
  email: string;
  zipcode: string;
  resultes: Resulte[];
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, resultes }: RequestBody = await req.json();
    let date = new Date();
    let resulteHtml = "";

    for (const el of resultes) {
      resulteHtml += `<div style="padding:10px;border-radius:5px;background-color:#f5f5f5;margin-top:10px;border-right:8px solid ${el.correct ? "#6af86a" : "#f04d4d"};"><p style="margin:0;padding:0;box-sizing:border-box;">Question: ${el.question}</p><p style="margin:5px 0;padding:0;box-sizing:border-box;">Answer: <strong>${el.answer}</strong></p><p style="margin:0;padding:0;box-sizing:border-box;">correctAnswer: <strong>${el.correctAnswer}</strong></p></div>`;

   
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      host: "smtp.gmail.com", // Use a known host
      port: 465,
      secure: true, // Set secure based on the port

      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    } as TransportOptions);

    const mailOption = {
      from:  process.env.USER,
      to: "Bouftini.ayoub1@gmail.com",
      subject: "Message from QuizWizdom", 
      html: `<body style="margin:0;padding:0;box-sizing:border-box;padding:50px 0 60px;background:#fbcbb6;font-family:Arial,Helvetica,sans-serif;color:#2a3347;"><div style="max-width:500px;background:#fcfbfa;padding:30px;margin:0 auto;"><h4 style="color:#fd6f4c;text-align:center;font-size:20px;margin:0;padding:0;box-sizing:border-box;">QuizWizdom</h4><div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;"><h4 style="white-space:nowrap;margin:0;padding:0;box-sizing:border-box;">Result for</h4><p style="width:100%;text-align:right;margin:0;padding:0;box-sizing:border-box;">${date.toDateString()}</p></div><div style="border-top:1px solid #fbcbb6;padding-top:20px;margin-top:20px;"><h4 style="margin:0;padding:0;box-sizing:border-box;">User Info</h4><p style="margin-top:10px;margin-bottom:5px;padding:0;box-sizing:border-box;">Full Name: ${name}</p><p style="margin:0;padding:0;box-sizing:border-box;">Email:<a style="display:inline-flex;color:salmon;" href="mailto:${email}">${email}</a></p></div><div style="border-top:1px solid #fbcbb6;padding-top:20px;margin-top:20px;"><h4 style="margin:0;padding:0;box-sizing:border-box;">Questions</h4>${resulteHtml}</div></div></body>`

    };

    await transporter.sendMail(mailOption);
    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
