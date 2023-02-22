FROM node:19.6.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /usr/src/app

RUN npm install -g nodemon


