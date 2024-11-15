# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

# Stage 2: Create a smaller image using alpine
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
