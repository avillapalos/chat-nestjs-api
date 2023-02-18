FROM postgres:12.6-alpine as postgres
COPY persistence/init.sql /docker-entrypoint-initdb.d/

FROM node:18.14.0-alpine3.17 AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .

RUN npm run build

FROM node:18.14.0-alpine3.17 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
