# FluentAI API

Backend da plataforma FluentAI — API REST construída com Node.js, Express e TypeScript.

## Stack

- **Runtime:** Node.js 22
- **Framework:** Express 5
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Autenticação:** JWT (Access + Refresh Tokens)
- **IA:** Groq API (Llama 3.3, Whisper, Orpheus TTS)
- **Email:** Resend
- **Validação:** Zod

## Pré-requisitos

- Node.js 22+
- PostgreSQL rodando localmente ou na nuvem
- Conta no [Groq](https://console.groq.com) (free tier)
- Conta no [Resend](https://resend.com) (free tier)

## Instalação

```bash
# Clone o repositório
git clone https://github.com/luisdandolini/fluentai-api.git
cd fluentai-api

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env
```

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/fluentai"

JWT_ACCESS_SECRET="seu_secret_aqui"
JWT_REFRESH_SECRET="outro_secret_aqui"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM="noreply@seudominio.com"

GROQ_API_KEY="gsk_xxxxxxxxxxxx"
```

## Banco de Dados

```bash
# Rodar migrations
yarn migrate

# Abrir Prisma Studio
yarn studio

# Gerar seed com IA (define TARGET_LANGUAGE no script)
yarn seed:generate
```

## Desenvolvimento

```bash
yarn dev
```

API disponível em `http://localhost:3000`

## Scripts

| Comando              | Descrição               |
| -------------------- | ----------------------- |
| `yarn dev`           | Servidor com hot reload |
| `yarn build`         | Compila para dist/      |
| `yarn start`         | Inicia em produção      |
| `yarn migrate`       | Executa migrations      |
| `yarn migrate:prod`  | Deploy de migrations    |
| `yarn studio`        | Prisma Studio           |
| `yarn seed:generate` | Gera seed com Groq IA   |
| `yarn lint`          | Verifica lint           |

## Endpoints

### Auth

| Método | Rota                       | Descrição                |
| ------ | -------------------------- | ------------------------ |
| POST   | `/api/auth/register`       | Registrar usuário        |
| POST   | `/api/auth/verify`         | Verificar email          |
| POST   | `/api/auth/login`          | Login                    |
| POST   | `/api/auth/refresh`        | Renovar token            |
| POST   | `/api/auth/reset-password` | Solicitar reset de senha |
| POST   | `/api/auth/confirm-reset`  | Confirmar reset de senha |

### Usuário

| Método | Rota                    | Descrição                |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/users/me`         | Dados do usuário         |
| PUT    | `/api/users/me`         | Atualizar perfil         |
| POST   | `/api/users/onboarding` | Completar onboarding     |
| GET    | `/api/users/dashboard`  | Estatísticas e progresso |

### Lições

| Método | Rota                               | Descrição          |
| ------ | ---------------------------------- | ------------------ |
| GET    | `/api/lessons/modules`             | Listar módulos     |
| GET    | `/api/lessons/modules/:id`         | Detalhe do módulo  |
| GET    | `/api/lessons/:id`                 | Detalhe da lição   |
| POST   | `/api/lessons/:id/complete`        | Concluir lição     |
| POST   | `/api/lessons/exercises/:id/check` | Verificar resposta |

### Chat

| Método | Rota                   | Descrição               |
| ------ | ---------------------- | ----------------------- |
| POST   | `/api/chat/message`    | Enviar mensagem para IA |
| POST   | `/api/chat/transcribe` | Transcrever áudio (STT) |
| POST   | `/api/chat/tts`        | Sintetizar voz (TTS)    |

## Estrutura

```
src/
├── index.ts              # Entry point
├── lib/
│   ├── prisma.ts         # Prisma client
│   ├── resend.ts         # Resend client
│   ├── validation.ts     # Zod schemas
│   ├── errors.ts         # AppError class
│   └── errorHandler.ts   # Error middleware
└── modules/
    ├── auth/             # Autenticação
    ├── user/             # Usuário e dashboard
    ├── lessons/          # Módulos e lições
    └── chat/             # Chat IA
```
