FROM node:21-alpine

# working dir
WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --production
RUN npm ci
COPY . .

# Build app prod
# RUN npm run build --production

# COPY ./.env ./build

EXPOSE 3333

# CMD ["node", "./build/server.js"]
ENTRYPOINT [ "node","ace","serve","watch" ]