FROM node:21-alpine3.17 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:21-alpine3.17

WORKDIR /app

COPY --from=build /app/dist .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "."]