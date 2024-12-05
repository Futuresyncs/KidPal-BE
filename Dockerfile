# Use Node.js LTS version
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the application's port
EXPOSE 8080

# Start the application
CMD ["node", "dist/main"]
