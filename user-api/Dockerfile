FROM node:alpine

RUN apk add --no-cache tzdata

WORKDIR /usr/src/app

COPY package.json .

RUN npm i -g nodemon
RUN npm i

ENTRYPOINT DEBUG=* nodemon /usr/src/app/bin/www