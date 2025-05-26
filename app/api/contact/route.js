// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, industry } = await req.json();

    if (!name || !email || !industry) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mahmoudhu37@gmail.com",
      subject: "New Proposal Request from Website",
      text: `Name: ${name}\nEmail: ${email}\nIndustry: ${industry}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Email failed" }), {
      status: 500,
    });
  }
}
