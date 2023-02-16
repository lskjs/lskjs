FROM node:19.5.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENTRYPOINT ["/app/bin/run"]
