# syntax=docker/dockerfile:1

FROM ianwalter/puppeteer:latest
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
COPY . .

CMD ["npm","run","tests:wdio"]

