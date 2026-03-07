-- AlterTable
ALTER TABLE "verification_codes" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'email_verification';
