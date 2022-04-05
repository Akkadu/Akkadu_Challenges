const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io",);
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    }
);


app.get('/', (req, res) => {
    res.json({ name: "Mesfin" })
});

io.on('connection', (socket) => {
    //Listen for Chat messages
    socket.on("createMessage", async function (msg) {
        console.log(msg)
        socket.broadcast.emit("message", msg)
    })

    socket.on("disconnect", () => {
        io.emit("message", "The user has left")
    })


});

server.listen(3005, () => {
    // console.log('listening on *:3005');
});