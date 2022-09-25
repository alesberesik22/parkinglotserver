FROM node:14-alpine
WORKDIR /app
ADD package*.json ./
RUN npm install
ADD . .
EXPOSE 9090
RUN npm run build
CMD npm run start