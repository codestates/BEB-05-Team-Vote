FROM node:16

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yarn

COPY ./ ./

RUN yarn build

RUN yarn postinstall

CMD [ "yarn", "start" ]