import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    // Basic validation for at least name and email
    if (!data.name || !data.email) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Determine which form data we got by checking fields
    let emailText = "";

    if ("industry" in data) {
      // First form
      if (!data.industry) {
        return new Response(
          JSON.stringify({ message: "Missing industry field" }),
          { status: 400 }
        );
      }
      emailText = `New Proposal Request from Website\n
Name: ${data.name}\n
Email: ${data.email}\n
Industry: ${data.industry}`;
    } else if ("title" in data && "company" in data && "mau" in data) {
      // Second form
      if (!data.title || !data.company || !data.mau) {
        return new Response(
          JSON.stringify({ message: "Missing fields for second form" }),
          { status: 400 }
        );
      }
      emailText = `New Contact Request from Website\n
Name: ${data.name}\n
Title: ${data.title}\n
Email: ${data.email}\n
Company: ${data.company}\n
MAU in the US: ${data.mau}`;
    } else {
      return new Response(JSON.stringify({ message: "Invalid form data" }), {
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
      subject: "New Form Submission from Website",
      text: emailText,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Email failed" }), {
      status: 500,
    });
  }
}
