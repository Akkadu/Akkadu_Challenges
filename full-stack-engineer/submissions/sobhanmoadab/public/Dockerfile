FROM node:16-alpine
WORKDIR /react

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
EXPOSE 3000
CMD ["npm","start"]