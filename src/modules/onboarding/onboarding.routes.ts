import { Router } from "express";
import { onboardingController } from "./onboarding.controller.ts";
import { authenticate } from "../auth/auth.middleware.ts";

export const onboardingRouter = Router();

onboardingRouter.post("/complete", authenticate, onboardingController.complete);
