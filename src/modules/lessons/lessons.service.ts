import { prisma } from "../../lib/prisma.ts";

export const lessonsService = {
  async getModules(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { language: true, level: true },
    });

    if (!user?.language || !user?.level) {
      throw new Error("Usuário sem idioma ou nível definido");
    }

    const modules = await prisma.module.findMany({
      where: { language: user.language, level: user.level },
      orderBy: { order: "asc" },
      include: {
        lessons: {
          orderBy: { order: "asc" },
          include: {
            userProgress: {
              where: { userId },
              select: { completed: true, score: true },
            },
            _count: { select: { exercises: true } },
          },
        },
      },
    });

    return modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        completed: lesson.userProgress[0]?.completed ?? false,
        score: lesson.userProgress[0]?.score ?? 0,
        exerciseCount: lesson._count.exercises,
        userProgress: undefined,
        _count: undefined,
      })),
    }));
  },

  async getLesson(lessonId: string, userId: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        exercises: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            type: true,
            question: true,
            options: true,
            order: true,
          },
        },
        userProgress: {
          where: { userId },
          select: { completed: true, score: true },
        },
      },
    });

    if (!lesson) throw new Error("Lição não encontrada");

    return {
      ...lesson,
      completed: lesson.userProgress[0]?.completed ?? false,
      score: lesson.userProgress[0]?.score ?? 0,
      userProgress: undefined,
    };
  },

  async completeLesson(lessonId: string, userId: string, score: number) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { exercises: { select: { id: true, answer: true } } },
    });

    if (!lesson) throw new Error("Lição não encontrada");

    const progress = await prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        completed: true,
        score,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        score: Math.max(score, 0),
        completedAt: new Date(),
      },
    });

    return progress;
  },

  async getProgress(userId: string) {
    const progress = await prisma.userLessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            module: { select: { title: true, language: true, level: true } },
          },
        },
      },
    });

    const completed = progress.filter((p) => p.completed).length;
    const total = progress.length;
    const avgScore =
      total > 0
        ? Math.round(progress.reduce((acc, p) => acc + p.score, 0) / total)
        : 0;

    return { completed, total, avgScore, lessons: progress };
  },

  async checkAnswer(lessonId: string, exerciseId: string, answer: string) {
    const exercise = await prisma.exercise.findFirst({
      where: { id: exerciseId, lessonId },
      select: { answer: true, type: true },
    });

    if (!exercise) throw new Error("Exercício não encontrado");

    const correct =
      exercise.answer.trim().toLowerCase() === answer.trim().toLowerCase();

    return { correct, correctAnswer: correct ? null : exercise.answer };
  },
};
