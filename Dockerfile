FROM node:6

RUN mkdir -p /usr/mqtt-relay
COPY . /usr/mqtt-relay
WORKDIR /usr/mqtt-relay
RUN npm install --production

CMD ["npm", "start"]
