# FROM node:20

# # working dir
# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci --production
# # RUN npm ci
# COPY . .

# # Build app prod
# RUN npm run build --production --ignore-ts-errors

# COPY ./.env ./build
# EXPOSE 3333

# CMD ["node", "./build/server.js"]
# ENTRYPOINT [ "node","ace","serve","watch" ]


ARG NODE_IMAGE=node:20

FROM $NODE_IMAGE AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
# RUN node ace build
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE $PORT
CMD [ "node", "node", "server.js" ]
# CMD ["node", "./build/server.js"]
