import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { lessonsController } from "./lessons.controller.js";

export const lessonsRouter = Router();

lessonsRouter.get("/modules", authenticate, lessonsController.getModules);
lessonsRouter.get("/progress", authenticate, lessonsController.getProgress);
lessonsRouter.get("/:id", authenticate, lessonsController.getLesson);
lessonsRouter.post(
  "/:id/complete",
  authenticate,
  lessonsController.completeLesson,
);
lessonsRouter.post("/:id/answer", authenticate, lessonsController.checkAnswer);
