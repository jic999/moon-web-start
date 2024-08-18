# build stage
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm config set registry https://registry.npmmirror.com/ \
  && npm i pnpm -g \
  && pnpm install

COPY . .

RUN pnpm build

# production stage
FROM nginx:1.26-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

