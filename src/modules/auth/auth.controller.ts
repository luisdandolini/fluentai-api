import type { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.ts";
import {
  registerSchema,
  loginSchema,
  verifySchema,
  refreshSchema,
} from "../../lib/validation.ts";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = registerSchema.parse(req.body);
      const result = await authService.register(body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, code } = verifySchema.parse(req.body);
      const result = await authService.verifyEmail(email, code);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = loginSchema.parse(req.body);
      const result = await authService.login(body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = refreshSchema.parse(req.body);
      const tokens = await authService.refresh(refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  },
};
