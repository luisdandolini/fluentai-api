import { AppError } from "../../lib/errors.ts";
import { prisma } from "../../lib/prisma.ts";
import { Level } from "@prisma/client";

export const userService = {
  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        language: true,
        level: true,
        onboarded: true,
        createdAt: true,
      },
    });

    if (!user) throw new AppError("Usuário não encontrado");
    return { user };
  },

  async updateSettings(userId: string, language: string, level: Level) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { language, level },
      select: {
        id: true,
        name: true,
        email: true,
        language: true,
        level: true,
        onboarded: true,
        createdAt: true,
      },
    });

    return { user };
  },
};
