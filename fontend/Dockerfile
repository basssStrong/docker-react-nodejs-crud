FROM node:18-alpine

WORKDIR /fontend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]