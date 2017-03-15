FROM node:7.7.2

RUN mkdir /var/www

ADD ./build/* /var/www/