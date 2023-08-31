FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3
RUN npm install -g nodemon
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
