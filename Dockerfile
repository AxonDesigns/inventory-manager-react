FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "bash", "-c", '"sleep infinity"' ]