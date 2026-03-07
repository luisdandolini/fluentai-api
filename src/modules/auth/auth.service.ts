import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";
import { resend } from "../../lib/resend.js";
import { AppError } from "../../lib/errors.js";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

interface TokenPayload {
  sub: string;
  email: string;
}

const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ||
      "15m") as SignOptions["expiresIn"],
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ||
      "7d") as SignOptions["expiresIn"],
  });

  return { accessToken, refreshToken };
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationEmail = async (
  email: string,
  name: string,
  code: string,
) => {
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: email,
    subject: "FluentAI — Verify your email",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Hello, ${name}!</h2>
        <p>Use the code below to verify your email:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #f4f4f4; border-radius: 8px;">
          ${code}
        </div>
        <p style="color: #666; font-size: 14px;">This code expires in 15 minutes.</p>
      </div>
    `,
  });
};

export const authService = {
  async register({ name, email, password }: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) throw new AppError("Email já está em uso");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.verificationCode.create({
      data: { userId: user.id, code, expiresAt },
    });

    await sendVerificationEmail(email, name, code);

    return {
      user,
      message:
        "Registration successful! Please check your email to verify your account.",
    };
  },

  async verifyEmail(email: string, code: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    if (user.verified) throw new AppError("Email já verificado");

    const verification = await prisma.verificationCode.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!verification) throw new AppError("Código inválido ou expirado");

    await prisma.$transaction([
      prisma.verificationCode.update({
        where: { id: verification.id },
        data: { used: true },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { verified: true },
      }),
    ]);

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        verified: true,
        onboarded: true,
        language: true,
        level: true,
        createdAt: true,
      },
    });

    const tokens = generateTokens({ sub: user.id, email: user.email });

    return { user: updatedUser, ...tokens };
  },

  async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new AppError("E-mail ou senha incorretos", 401);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new AppError("E-mail ou senha incorretos", 401);

    if (!user.verified)
      throw new AppError(
        "Por favor verifique seu e-mail antes de fazer login",
        401,
      );

    const tokens = generateTokens({ sub: user.id, email: user.email });

    const safeUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        verified: true,
        onboarded: true,
        language: true,
        level: true,
        createdAt: true,
      },
    });

    return { user: safeUser, ...tokens };
  },

  async refresh(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as TokenPayload;

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    const tokens = generateTokens({ sub: user.id, email: user.email });

    return tokens;
  },
};
