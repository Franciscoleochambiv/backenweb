
FROM ubuntu:latest
MAINTAINER Name grupo90pr@gmail.com
ENV DEBIAN_FRONTEND noninteractive
# Install basics
RUN apt-get update 
RUN apt-get install nodejs -y
RUN apt-get install npm  -y



#FROM node:10.13-alpine

WORKDIR /var/www/html/backenweb

COPY ["package.json", "package-lock.json*", "./"]

RUN apt-get install xmlsec1 -y
RUN apt-get install zip -y
RUN npm install


COPY . .

EXPOSE 3500

CMD npm start
