# Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the Next.js dev server
EXPOSE 3000

# Set environment variables for host and port
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the Next.js app in development mode, explicitly binding to the host and port
CMD ["npx", "next", "dev", "-H", "0.0.0.0", "-p", "3000"]
