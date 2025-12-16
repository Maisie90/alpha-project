FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]