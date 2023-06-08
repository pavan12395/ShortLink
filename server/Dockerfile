FROM alpine

# Install Node.js and npm dependencies
RUN apk add --no-cache nodejs npm


WORKDIR /backend

COPY package*.json .


RUN apk update && apk add curl

COPY . .

EXPOSE 5000

CMD rm -rf node_modules && ["npm","update"] && ["npm","install"] && ["npm","start"]