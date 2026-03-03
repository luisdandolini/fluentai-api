import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.ts";
import { userController } from "./user.controller.ts";

export const userRouter = Router();

userRouter.get("/me", authenticate, userController.me);
