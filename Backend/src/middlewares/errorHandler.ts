import { Request } from "../interface/auth";
import { NextFunction, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";
import { ForbiddenError } from "../error/ForbiddenError";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { ConflictError } from "../error/ConflictError";

const logger = loggerWithNameSpace("ErrorHandler");

export function notFoundError(req: Request, res: Response) {
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "Not Found",
  });
}

export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  let statusCode: number;
  let errorMessage: string;

  switch (true) {
    case error instanceof UnauthenticatedError:
      statusCode = HttpStatusCodes.UNAUTHORIZED;
      errorMessage = error.message;
      break;
    case error instanceof ForbiddenError:
      statusCode = HttpStatusCodes.FORBIDDEN;
      errorMessage = error.message;
      break;
    case error instanceof BadRequestError:
      statusCode = HttpStatusCodes.BAD_REQUEST;
      errorMessage = error.message;
      break;
    case error instanceof NotFoundError:
      statusCode = HttpStatusCodes.NOT_FOUND;
      errorMessage = error.message;
      break;
    case error instanceof ConflictError:
      statusCode = HttpStatusCodes.CONFLICT;
      errorMessage = error.message;
      break;
    default:
      statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
      errorMessage = "Internal Server Error";
  }

  return res.status(statusCode).json({ message: errorMessage });
}
