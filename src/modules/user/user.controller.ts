import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.ts";
import { prisma } from "../../lib/prisma.ts";

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

  async dashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, language: true, level: true },
      });

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      const totalModules = await prisma.module.count({
        where: { language: user.language!, level: user.level! },
      });

      const progress = await prisma.userLessonProgress.findMany({
        where: { userId },
        include: {
          lesson: {
            include: {
              module: { select: { id: true, title: true, order: true } },
            },
          },
        },
        orderBy: { completedAt: "desc" },
      });

      const completedLessons = progress.length;
      const averageScore =
        completedLessons > 0
          ? Math.round(
              progress.reduce((sum, p) => sum + p.score, 0) / completedLessons,
            )
          : 0;

      const moduleIds = [
        ...new Set(progress.map((progres) => progres.lesson.module.id)),
      ];
      let completedModules = 0;

      for (const moduleId of moduleIds) {
        const totalLessons = await prisma.lesson.count({ where: { moduleId } });
        const completedInModule = progress.filter(
          (progres) => progres.lesson.module.id === moduleId,
        ).length;
        if (completedInModule === totalLessons) completedModules++;
      }

      const allModules = await prisma.module.findMany({
        where: { language: user.language!, level: user.level! },
        include: { lessons: true },
        orderBy: { order: "asc" },
      });

      const completedLessonIds = new Set(progress.map((p) => p.lessonId));
      let nextModule = null;

      for (const mod of allModules) {
        const hasIncomplete = mod.lessons.some(
          (l) => !completedLessonIds.has(l.id),
        );
        if (hasIncomplete) {
          nextModule = { id: mod.id, title: mod.title, order: mod.order };
          break;
        }
      }

      const recentLessons = progress.slice(0, 3).map((progres) => ({
        id: progres.lessonId,
        title: progres.lesson.title,
        score: progres.score,
        moduleTitle: progres.lesson.module.title,
        completedAt: progres.completedAt,
      }));

      res.status(200).json({
        user: { name: user.name, language: user.language, level: user.level },
        stats: {
          completedLessons,
          completedModules,
          totalModules,
          averageScore,
        },
        nextModule,
        recentLessons,
      });
    } catch (err) {
      next(err);
    }
  },

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const { language, level } = req.body;
      const result = await userService.updateSettings(userId, language, level);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
