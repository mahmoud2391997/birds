import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export async function requireAuth(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    // Attach user payload to request
    (req as any).user = decoded;

    return null; // means authorized
  } catch (err) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}

export async function requireAdmin(req: NextRequest) {
  const authResponse = await requireAuth(req);
  if (authResponse) return authResponse;

  const user = (req as any).user;
  if (user.role !== "admin") {
    return NextResponse.json({ message: "Forbidden: Admins only" }, { status: 403 });
  }

  return null;
}
