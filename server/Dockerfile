FROM node:20


# Bundle app source
WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npx prisma generate

RUN npm run build
CMD [ "node", "dist/index.js" ]
