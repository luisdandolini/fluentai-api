// import type { Request, Response, NextFunction } from "express";
// import { authService } from "./auth.service.js";
// import {
//   registerSchema,
//   loginSchema,
//   verifySchema,
//   refreshSchema,
// } from "../../lib/validation.js";

// export const authController = {
//   async register(req: Request, res: Response, next: NextFunction) {
//     try {
//       const body = registerSchema.parse(req.body);
//       const result = await authService.register(body);
//       res.status(201).json(result);
//     } catch (err) {
//       next(err);
//     }
//   },

//   async verifyEmail(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { email, code } = verifySchema.parse(req.body);
//       const result = await authService.verifyEmail(email, code);
//       res.status(200).json(result);
//     } catch (err) {
//       next(err);
//     }
//   },

//   async login(req: Request, res: Response, next: NextFunction) {
//     try {
//       const body = loginSchema.parse(req.body);
//       const result = await authService.login(body);
//       res.status(200).json(result);
//     } catch (err) {
//       next(err);
//     }
//   },

//   async refresh(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { refreshToken } = refreshSchema.parse(req.body);
//       const tokens = await authService.refresh(refreshToken);
//       res.status(200).json(tokens);
//     } catch (err) {
//       next(err);
//     }
//   },
// };

import type { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service.js";
import {
  registerSchema,
  loginSchema,
  verifySchema,
  refreshSchema,
  resetPasswordSchema,
  confirmResetSchema,
} from "../../lib/validation.js";

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

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const body = resetPasswordSchema.parse(req.body);
      const result = await authService.resetPassword(body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async confirmReset(req: Request, res: Response, next: NextFunction) {
    try {
      const body = confirmResetSchema.parse(req.body);
      const result = await authService.confirmReset(body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
