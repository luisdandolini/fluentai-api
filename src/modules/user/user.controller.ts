import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.ts";

export const userController = {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const result = await userService.me(userId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
