FROM node:16.17.0-alpine

ENV NODE_ENV=production

# work direction
WORKDIR /app
COPY ./package*.json ./

# install packages
RUN yarn 


COPY . /app

EXPOSE 3000

CMD ["yarn", "start"]