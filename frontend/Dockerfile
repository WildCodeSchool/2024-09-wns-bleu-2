FROM node:lts-alpine
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src src
COPY codegen.ts codegen.ts
COPY index.html index.html
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.json tsconfig.json
COPY tsconfig.node.json tsconfig.node.json
COPY vite.config.ts vite.config.ts
COPY public /app/public


CMD npm run start