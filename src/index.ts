import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { ZodError } from "zod";
import cors from "cors";
import { onboardingRouter } from "./modules/onboarding/onboarding.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import { lessonsRouter } from "./modules/lessons/lessons.routes.js";
import { chatRouter } from "./modules/chat/chat.routes.js";
import { AppError } from "./lib/errors.js";
import { errorHandler } from "./lib/errorHandler.js";

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
  console.log(`FluentAI API! running on http://localhost:${PORT}`);
});
