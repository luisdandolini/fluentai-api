import { Router } from "express";
import { onboardingController } from "./onboarding.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

export const onboardingRouter = Router();

onboardingRouter.post("/complete", authenticate, onboardingController.complete);
