FROM node:20-alpine
WORKDIR /f1dash
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]