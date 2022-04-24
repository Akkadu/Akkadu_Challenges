Documentations:
Server(NodeJs)
1-Docker:
-cd to /server & set DOCKER_MONGO_URI in .env file (already created in example.env)

pull these images to run them on your local machine
    server_image: https://hub.docker.com/r/illomens/akkadu-fullstack-client
    client_image: https://hub.docker.com/r/illomens/akkadu-fullstack-server
-in /server directory, docker-compose up
2-Localhost:

cd to /server & use example.env to create .env
if DOCKER_MONGO_URI value is not filled, mongodb will connect to localhost
npm i & npm start
Client(ReactJs):

cd to /public & npm i
npm start
After running both projects, make sure to hit this endpoint: https://localhost:8300/api/v1/product/seed to insert some products into the database then open port 3000 on localhost
