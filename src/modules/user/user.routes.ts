import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.ts";
import { userController } from "./user.controller.ts";

export const userRouter = Router();

userRouter.get("/me", authenticate, userController.me);
userRouter.get("/dashboard", authenticate, userController.dashboard);
userRouter.put("/settings", authenticate, userController.updateSettings);
