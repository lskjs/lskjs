FROM node:7.7.2

RUN mkdir /app

ADD ./build/* /app/