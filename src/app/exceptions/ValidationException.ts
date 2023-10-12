import { StatusCodes } from "http-status-codes";
import HttpException from "./HttpException";
import { ZodError } from "zod";

type ValidationErrorMessage = {
  field: string | number;
  error: string;
};

export default class ValidationException extends HttpException {
  constructor(e: ZodError) {
    const message: ValidationErrorMessage[] = [];
    e.issues.forEach((issue) =>
      message.push({ field: issue.path[0], error: issue.message }),
    );
    super(StatusCodes.BAD_REQUEST, message);
  }
}
