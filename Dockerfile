FROM node:6.9.2
RUN npm i -g yarn
VOLUME ./ /project

RUN cd /project
ENV NODE_ENV=development
RUN yarn install

ENV NODE_ENV=production
RUN yarn run build

RUN cd /project/build
RUN yarn install

RUN mkdir /app

COPY /project/build /app/

RUN yarn start