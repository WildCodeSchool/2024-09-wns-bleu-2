FROM node:lts-alpine

WORKDIR /app

COPY package.json package.json
COPY tsconfig.json .
RUN npm install
RUN npm i -g tsx

COPY import-cities.ts ./import-cities.ts

CMD ["npm", "start"]