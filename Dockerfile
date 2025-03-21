FROM node:lts-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
EXPOSE 3000
COPY package*.json .
RUN npm install
COPY . /app
RUN npm run build
CMD [ "npm","run", "dev" ]


FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json .
RUN npm install --production
COPY --from=builder ./app/dist ./dist
CMD ["npm", "start"]
