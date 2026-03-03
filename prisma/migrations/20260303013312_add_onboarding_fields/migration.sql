-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'BASIC', 'INTERMEDIATE', 'ADVANCED', 'FLUENT');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" TEXT,
ADD COLUMN     "level" "Level",
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
