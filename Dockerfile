FROM node:10

# Creating Work Directory
WORKDIR /usr/src/app

# Copy Package.json file
COPY package*.json ./

# Installing Dependancies
RUN npm install

# Bundle App Source
COPY . .

# Opening Port
EXPOSE 7500

# Running Server.js
CMD [ "node", "libs/server.js" ]