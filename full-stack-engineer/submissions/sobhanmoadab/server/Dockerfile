FROM node:16-alpine
WORKDIR /node
COPY package.json /node
COPY tsconfig.json /node
COPY . /node
ENV JWT_SECRET supersecret
RUN npm install
EXPOSE 8300

CMD ["npm", "start"]