// import { Router } from "express";
// import { authController } from "./auth.controller.js";

// export const authRouter = Router();

// authRouter.post("/register", authController.register);
// authRouter.post("/verify", authController.verifyEmail);
// authRouter.post("/login", authController.login);
// authRouter.post("/refresh", authController.refresh);

import { Router } from "express";
import { authController } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/verify", authController.verifyEmail);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/confirm-reset", authController.confirmReset);
