FROM node
COPY index.js .
COPY package.json .
COPY package-lock.json .
RUN npm install -g cnpm
RUN cnpm ci
CMD ["npm", "start"]
