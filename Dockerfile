FROM node:6-alpine

RUN mkdir -p /usr/mqtt-relay
COPY . /usr/mqtt-relay
WORKDIR /usr/mqtt-relay
RUN apk add --no-cache git
RUN npm install --production

CMD ["npm", "start"]
