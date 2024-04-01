# Use the official Node.js:lst runtime as a base image
FROM --platform=linux/amd64 node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY client/package.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app
RUN pwd ; ls -lrt

# # Build the frontend
RUN cd client && npm run build

# Set the working directory to /server
WORKDIR /app/server

# Install the dependencies
RUN npm install

# Set the environment variable for the server
ENV NODE_ENV=production

# Expose the port that the server is listening on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]