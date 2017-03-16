FROM node:6.9.2
COPY . /project

WORKDIR /project
RUN cd /project
ENV NODE_ENV=development
RUN yarn install

# ENV NODE_ENV=production
# RUN yarn run build

# WORKDIR /project/build
# RUN cd /project/build
# RUN yarn install

# WORKDIR /app
# RUN mkdir /app
# RUN mv /project/build/* /app
# RUN rm -rf /project

# CMD ["yarn", "start"]