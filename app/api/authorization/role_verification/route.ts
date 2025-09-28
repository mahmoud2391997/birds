import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export interface AuthenticatedRequest extends NextRequest {
  user?: any; // Replace `any` with your token payload type
}

const requireAuth = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Malformed token" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    // attach user to request clone
    (req as AuthenticatedRequest).user = decoded;

    return null; // means "auth passed"
  } catch {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
};

export async function GET(req: NextRequest) {
  const authResponse = await requireAuth(req);
  if (authResponse) return authResponse; // stops if unauthorized

  const user = (req as AuthenticatedRequest).user;

  // Example role check
  if (user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ message: "You are authorized as admin!" });
}
