FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install npm -y && \
    npm install -g npm

WORKDIR /usr/app

COPY ./ /usr/app/

RUN npm install

CMD ["npm", "start"]

