FROM node:10-alpine

RUN apk add --no-cache bash && apk add --no-cache ca-certificates && apk add --no-cache postgresql-client

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn global add pm2 sequelize-cli
RUN yarn
COPY ecosystem.config.js ./

RUN ls -la
COPY . .

EXPOSE 3000

#RUN ./scripts/entrypoint.sh

CMD ["pm2-runtime", "start",  "ecosystem.config.js", "--web", "port"]









