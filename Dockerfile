FROM node:10
WORKDIR /app
COPY . /app
CMD yarn start:dev
EXPOSE 3333