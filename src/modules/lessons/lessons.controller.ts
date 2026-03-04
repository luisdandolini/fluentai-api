import type { Request, Response, NextFunction } from "express";
import { lessonsService } from "./lessons.service.ts";

export const lessonsController = {
  async getModules(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const modules = await lessonsService.getModules(userId);
      res.status(200).json({ modules });
    } catch (err) {
      next(err);
    }
  },

  async getLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const { id } = req.params as { id: string };
      const lesson = await lessonsService.getLesson(id, userId);
      res.status(200).json({ lesson });
    } catch (err) {
      next(err);
    }
  },

  async completeLesson(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const { id } = req.params as { id: string };
      const { score } = req.body;
      const progress = await lessonsService.completeLesson(id, userId, score);
      res.status(200).json({ progress });
    } catch (err) {
      next(err);
    }
  },

  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const progress = await lessonsService.getProgress(userId);
      res.status(200).json(progress);
    } catch (err) {
      next(err);
    }
  },

  async checkAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const { exerciseId, answer } = req.body;
      const result = await lessonsService.checkAnswer(id, exerciseId, answer);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
