FROM node:14-alpine
ARG NODE_ENV=development
ARG PORT=3000
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
