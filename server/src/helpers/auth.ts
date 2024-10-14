import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("No JWT secret key provided");
  }
  const decoded = await jwt.verify(token, secret);
  return decoded;
}

export async function authenticateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { success, errorMesssage } = await isAuthenticated(req);
  if (!success) {
    console.log(errorMesssage);
    //return res.status(401).send({ error: errorMesssage });
  } else {
    console.log("Authenticated");
  }
  next();
}

export async function isAuthenticated(req: Request): Promise<{
  success: boolean;
  errorMesssage: string;
}> {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
  ) {
    return { success: true, errorMesssage: "" };
  }
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {
      success: false,
      errorMesssage: "No authorization header provided",
    };
  }
  const token = authHeader.split("JWT ")[1];
  if (!token) {
    return { success: false, errorMesssage: "No token provided" };
  }
  try {
    const _user = await verifyToken(token);
    return { success: true, errorMesssage: "" };
  } catch (err) {
    return { success: false, errorMesssage: "Invalid token" };
  }
}
