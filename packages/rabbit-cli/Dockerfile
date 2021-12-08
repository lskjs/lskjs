FROM node:15.8.0

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install
COPY ./build /app

ENTRYPOINT ["/app/bin/cli.js"]
