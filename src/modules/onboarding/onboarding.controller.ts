import type { Request, Response, NextFunction } from "express";
import { onboardingService } from "./onboarding.service.ts";

export const onboardingController = {
  async complete(req: Request, res: Response, next: NextFunction) {
    try {
      const { language, level } = req.body;
      const userId = req.user!.sub;
      const result = await onboardingService.complete({
        userId,
        language,
        level,
      });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
