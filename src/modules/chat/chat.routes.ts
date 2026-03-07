import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { chatController } from "./chat.controller.js";
import multer from "multer";

export const chatRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

chatRouter.post("/message", authenticate, chatController.sendMessage);
chatRouter.post(
  "/transcribe",
  authenticate,
  upload.single("audio"),
  chatController.transcribe,
);
chatRouter.post("/tts", authenticate, chatController.textToSpeech);
