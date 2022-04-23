FROM node:16-alpine
WORKDIR /node
COPY package.json /node
COPY tsconfig.json /node
COPY . /node
ENV JWT_SECRET supersecret
ENV PORT 8300
RUN npm install
EXPOSE 8300

CMD ["npm", "run","start:dev"]