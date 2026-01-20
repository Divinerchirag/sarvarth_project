import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const cookieOptions = {
  httpOnly: true,                        
  secure: process.env.NODE_ENV === "production", 
  sameSite: "strict" as const,            
  maxAge: 30 * 24 * 60 * 60 * 1000,        
};


export interface TokenPayload {
  id: string;
  role?: string;
}


export const generateToken = (
  payload: TokenPayload,
  options?: SignOptions
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
    ...options,
  });
};


export const verifyToken = (token: string): TokenPayload & JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload & JwtPayload;
};
