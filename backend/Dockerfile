FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000

# Run the backend entry file from the copied repository root
CMD ["node", "backend/index.js"]