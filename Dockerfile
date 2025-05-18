# build stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# web deps
COPY package.json pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com/ \
  && npm i pnpm -g \
  && pnpm install

# server deps
COPY server/package.json server/pnpm-lock.yaml ./server/

RUN cd server && pnpm install

COPY . .

RUN pnpm build

RUN cd server && pnpm build

RUN cp -r dist/* server/dist/public

# production stage
FROM node:18-alpine AS production-stage

ENV FAVICON_API=google
ENV DATA_ID_SALT=salt

WORKDIR /app

COPY ./server/package.json ./server/pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com/ \
  && npm i pnpm -g \
  && pnpm install --production

COPY ./server .

COPY --from=build-stage /app/server/dist ./dist

CMD ["pnpm", "prod:docker"]

EXPOSE 1890


