#
#   docker build -t frontend .
#   docker run -p 9090:80 frontend
#

#############
### build ###
#############

# base image
#FROM node:12.2.0 as build
FROM mhart/alpine-node:12 as build

# install chrome for protractor tests
# RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
# RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
# RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /front

RUN apt-get update

# add `/backend/node_modules/.bin` to $PATH
# ENV PATH /front/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /front/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . /front

# run tests
#RUN ng test --watch=false
#RUN ng e2e --port 4202

# generate build
RUN ng build --output-path=dist

############
### prod ###
############
WORKDIR /front

# base image
FROM nginx:1.16.0-alpine

# COPÏE du build dans le container
COPY dist/front/ /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer le serveur web
CMD ["nginx", "-g", "daemon off;"]