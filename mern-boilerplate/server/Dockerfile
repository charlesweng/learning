FROM ubuntu:18.10

RUN apt-get update
RUN apt-get install --yes \
            nodejs npm 

COPY dist/bundle.js /app/bundle.js
RUN cd /app
EXPOSE 3000
cmd ["node", "/app/bundle.js"]

