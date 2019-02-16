FROM node:10-alpine

WORKDIR /srv/app

COPY . .

RUN npm ci

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
