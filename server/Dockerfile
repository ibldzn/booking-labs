FROM node:19.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081 9229

CMD ["npm", "run", "debug"]
