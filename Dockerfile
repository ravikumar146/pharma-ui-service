# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build:prod


# Runtime stage
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build /app/dist/pharma-ui-service ./dist/pharma-ui-service
COPY --from=build /app/package.json ./package.json

EXPOSE 8080

CMD ["node", "dist/pharma-ui-service/server/server.mjs"]