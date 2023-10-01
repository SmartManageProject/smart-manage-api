import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = data as unknown as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED);
  }
};
