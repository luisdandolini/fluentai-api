import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter } from "./modules/auth/auth.routes.ts";
import { ZodError } from "zod";
import cors from "cors";
import { onboardingRouter } from "./modules/onboarding/onboarding.routes.ts";
import { userRouter } from "./modules/user/user.routes.ts";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/onboarding", onboardingRouter);
app.use("/api/users", userRouter);

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

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: "Validation error",
      details: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  console.error(`[Error] ${err.message}`);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`FluentAI API running on http://localhost:${PORT}`);
});
