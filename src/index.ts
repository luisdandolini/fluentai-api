import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter } from "./modules/auth/auth.routes.ts";
import { ZodError } from "zod";
import cors from "cors";
import { onboardingRouter } from "./modules/onboarding/onboarding.routes.ts";
import { userRouter } from "./modules/user/user.routes.ts";
import { lessonsRouter } from "./modules/lessons/lessons.routes.ts";
import { chatRouter } from "./modules/chat/chat.routes.ts";
import { AppError } from "./lib/errors.ts";
import { errorHandler } from "./lib/errorHandler.ts";

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/onboarding", onboardingRouter);
app.use("/api/users", userRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/chat", chatRouter);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    app: "FluentAI API",
    timestamp: new Date().toISOString(),
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`FluentAI API running on http://localhost:${PORT}`);
});
