FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY src ./

EXPOSE 3000

CMD ["bun", "run", "index.ts"]
