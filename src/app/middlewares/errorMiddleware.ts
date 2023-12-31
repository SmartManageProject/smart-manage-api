import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { StatusCodes } from "http-status-codes";

export default (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong";
  res.status(status).send({ status, message });
};
