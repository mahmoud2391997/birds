import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { generateToken } from "../../../../lib/jwt";


export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken({ id: newUser._id, role: newUser.role });

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
