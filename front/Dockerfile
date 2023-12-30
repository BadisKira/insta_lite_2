# Use a lightweight Node.js image as the base image
FROM node:21-alpine3.17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app with Vite
RUN npm run build

# Use a smaller image for serving the production build
FROM node:21-alpine3.17

# Set the working directory to the build output directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist .

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "."]
