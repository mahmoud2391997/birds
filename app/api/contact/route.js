import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple sanitization function
function sanitize(input) {
  if (typeof input !== "string") return "";
  return input.replace(/[<>]/g, "");
}

// Simple email validation regex
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Simplified reCAPTCHA verification for Vercel deployment
async function verifyRecaptcha(token) {
  try {
    // Use the simpler reCAPTCHA v3 verification
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not found");
      return null;
    }

    console.log("Verifying reCAPTCHA token...");
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    console.log("reCAPTCHA verification response:", data);

    if (!data.success) {
      console.error("reCAPTCHA verification failed:", data["error-codes"]);
      return null;
    }

    console.log("reCAPTCHA verification successful, score:", data.score);
    return data.score || 0.9;
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return null;
  }
}

export async function POST(req) {
  try {
    console.log("=== Contact Form API Called ===");

    // Log environment variables (without exposing sensitive data)
    console.log("Environment check:", {
      EMAIL_USER: process.env.EMAIL_USER ? "✓ Present" : "✗ Missing",
      EMAIL_PASS: process.env.EMAIL_PASS ? "✓ Present" : "✗ Missing",
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY
        ? "✓ Present"
        : "✗ Missing",
      NODE_ENV: process.env.NODE_ENV,
    });

    const body = await req.json();
    console.log("Request body received:", {
      ...body,
      captchaToken: body.captchaToken ? "present" : "missing",
    });

    const { name, email, title, company, mau, industry, captchaToken } = body;

    // Handle different form types
    const isContactForm = title && company && mau;
    const isServicesForm = industry && !title;

    console.log("Form type detected:", { isContactForm, isServicesForm });

    // MODIFIED: More lenient reCAPTCHA verification for production
    if (captchaToken) {
      console.log("Attempting reCAPTCHA verification...");
      const score = await verifyRecaptcha(captchaToken);

      if (score === null) {
        console.warn(
          "reCAPTCHA verification failed, but allowing submission to proceed"
        );
        // Don't block the submission, just log the warning
      } else if (score < 0.3) {
        // Only block if score is very low (more lenient threshold)
        console.error("reCAPTCHA score too low", { score });
        return json(
          {
            message: "Security verification failed. Please try again.",
            score,
            debug: "Score too low",
          },
          { status: 403 }
        );
      } else {
        console.log("reCAPTCHA verification passed with score:", score);
      }
    } else {
      console.warn(
        "No reCAPTCHA token provided, proceeding without verification"
      );
    }

    // Basic validation
    if (!name || !email) {
      console.error("Missing required fields:", {
        name: !!name,
        email: !!email,
      });
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.error("Invalid email address:", email);
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safeTitle = title ? sanitize(title) : "";
    const safeCompany = company ? sanitize(company) : "";
    const safeMau = mau ? sanitize(mau) : "";
    const safeIndustry = industry ? sanitize(industry) : "";

    console.log("Sanitized data:", {
      safeName,
      safeEmail,
      safeTitle,
      safeCompany,
      safeMau,
      safeIndustry,
    });

    // Check email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing:", {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
      });
      return NextResponse.json(
        { message: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("Email configuration verified, setting up transporter...");

    // Set up nodemailer transporter with explicit configuration for Vercel
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add these options for better compatibility with Vercel
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log(
      "Email transporter configured (skipping verification in serverless environment)"
    );

    // Prepare email content based on form type
    let emailContent = `Name: ${safeName}\nEmail: ${safeEmail}\n`;
    let subject = "New Contact Form Submission";

    if (isContactForm) {
      emailContent += `Title: ${safeTitle}\nCompany: ${safeCompany}\nMAU in US: ${safeMau}`;
      subject = "New Proposal Request from Website";
    } else if (isServicesForm) {
      emailContent += `Industry: ${safeIndustry}`;
      subject = "New Service Inquiry from Website";
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: subject,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #8B5CF6; padding-bottom: 10px;">${subject}</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${
              isContactForm
                ? `
              <p><strong>Title:</strong> ${safeTitle}</p>
              <p><strong>Company:</strong> ${safeCompany}</p>
              <p><strong>MAU in US:</strong> ${safeMau}</p>
            `
                : ""
            }
            ${
              isServicesForm
                ? `
              <p><strong>Industry:</strong> ${safeIndustry}</p>
            `
                : ""
            }
          </div>
          <p style="color: #666; font-size: 12px;">
            Submitted on: ${new Date().toLocaleString()}<br>
            From: Birds Marketing Contact Form<br>
            Domain: ${req.headers.get("host") || "Unknown"}
          </p>
        </div>
      `,
    };

    console.log("Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Send email directly without verification
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    return NextResponse.json(
      {
        message: "Email sent successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Email error:", error);

    // Provide more specific error messages
    let errorMessage = "Email sending failed";
    if (error instanceof Error) {
      if (
        error.message.includes("Invalid login") ||
        error.message.includes("authentication")
      ) {
        errorMessage =
          "Email authentication failed. Please check your email credentials.";
      } else if (
        error.message.includes("Network") ||
        error.message.includes("ENOTFOUND")
      ) {
        errorMessage = "Network error occurred while sending email.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Email sending timed out. Please try again.";
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        message: errorMessage,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
