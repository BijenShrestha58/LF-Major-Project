import { Response, Request } from "express";
import * as AuthService from "../service/auth";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthController");

/**
 * Handles user login request.
 * @param {Request} req - The request object containing user credentials in the request body.
 * @param {Response} res - The response object to send back the login result.
 * @returns {Promise<void>}
 */
export async function login(req: Request, res: Response) {
  const { body } = req;

  const data = await AuthService.login(body);
  logger.info("Called login");

  res.json(data);
}

/**
 * Handles token refresh request.
 * @param {Request} req - The request object containing the refresh token in the request body.
 * @param {Response} res - The response object to send back the refreshed token or error message.
 * @returns {Promise<void>}
 */
export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const data = await AuthService.refresh(refreshToken);
  logger.info("Called refresh");

  res.json(data);
}
