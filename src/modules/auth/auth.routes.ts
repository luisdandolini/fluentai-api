import { Router } from "express";
import { authController } from "./auth.controller.ts";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/verify", authController.verifyEmail);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
