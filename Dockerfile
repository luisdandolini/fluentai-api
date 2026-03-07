FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn db:generate
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/index.js"]
