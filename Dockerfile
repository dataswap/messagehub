FROM node:latest

RUN mkdir -p /home/dataswap/messagehub

WORKDIR /home/dataswap/messagehub

COPY . /home/dataswap/messagehub/

RUN npm install

CMD ["npm", "start"]