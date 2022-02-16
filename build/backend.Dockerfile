FROM node:16

COPY ./src/backend /usr/app

WORKDIR /usr/app

RUN npm i

RUN npm run build

RUN cp .env dist

WORKDIR /usr/app/dist

EXPOSE 4000

ENTRYPOINT ["node", "app.js"]