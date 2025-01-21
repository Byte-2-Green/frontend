# Use the official Node.js 18 image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port configured in the environment variable
ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

# Set the environment variable for the Node environment
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
