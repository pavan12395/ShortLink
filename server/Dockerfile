# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

RUN npm update

# Install the application dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the Node.js application
CMD [ "npm", "start" ]