FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY src ./

CMD ["bun", "run", "src/index.ts"]
