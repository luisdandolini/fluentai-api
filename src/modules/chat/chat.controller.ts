import type { Request, Response, NextFunction } from "express";
import { chatService } from "./chat.service.ts";
import { prisma } from "../../lib/prisma.ts";

export const chatController = {
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const { messages } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { language: true, level: true },
      });

      if (!user?.language || !user?.level) {
        res.status(400).json({ error: "Usuário sem idioma ou nível definido" });
        return;
      }

      const result = await chatService.sendMessage(
        messages,
        user.language,
        user.level,
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async transcribe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Nenhum arquivo de áudio enviado" });
        return;
      }

      const result = await chatService.transcribe(
        req.file.buffer,
        req.file.mimetype,
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },

  async textToSpeech(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.sub;
      const { text } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { language: true },
      });

      const buffer = await chatService.textToSpeech(text);

      res.set({
        "Content-Type": "audio/wav",
        "Content-Length": buffer.length,
      });

      res.send(buffer);
    } catch (err) {
      next(err);
    }
  },
};
