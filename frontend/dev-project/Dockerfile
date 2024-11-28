FROM node:20-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package*.json .

RUN npm install axios && npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS IMAGE_PROD

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

EXPOSE 5173

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

EXPOSE 5173

CMD ["npm","run", "preview"]
