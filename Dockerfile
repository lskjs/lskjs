FROM node:6.9.2

WORKDIR /app

ADD ["./build", "/app"]
CMD ["npm", "start"]