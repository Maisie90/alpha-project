FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Run the backend entry file from the copied repository root
CMD ["node", "index.js"]