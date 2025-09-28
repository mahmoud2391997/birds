import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../lib/jwt";

export const requireAuth = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      (req as any).user = decoded;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
