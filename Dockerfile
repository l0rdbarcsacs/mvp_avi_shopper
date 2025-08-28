# Use Node.js 18 alpine image for smaller size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Make start script executable
RUN chmod +x start-server.sh

# Expose port 5173 (Vite default port)
EXPOSE 5173

# Start development server with custom script
CMD ["sh", "./start-server.sh"]
