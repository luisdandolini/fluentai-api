import { prisma } from "../../lib/prisma.js";

interface OnboardingDTO {
  userId: string;
  language: string;
  level: "BEGINNER" | "BASIC" | "INTERMEDIATE" | "ADVANCED" | "FLUENT";
}

export const onboardingService = {
  async complete({ userId, language, level }: OnboardingDTO) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { language, level, onboarded: true },
      select: {
        id: true,
        name: true,
        email: true,
        language: true,
        level: true,
        onboarded: true,
      },
    });

    return { user };
  },
};
