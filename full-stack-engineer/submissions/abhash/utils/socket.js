const {getUsers, users} = require('./getUsers');

//Socket connection
function socket(io) {
    io.on('connection', (socket) => {

        socket.on('joined-user', (data) =>{
            //Storing users connected in a room in memory
            var user = {};
            user[socket.id] = data.username;
            if(users[data.roomname]){
                users[data.roomname].push(user);
            }
            else{
                users[data.roomname] = [user];
            }
            
            //Joining the Socket Room
            socket.join(data.roomname);
    
            //Emitting New Username to Clients
            io.to(data.roomname).emit('joined-user', {username: data.username});
    
            //Send online users array
            io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]))
        })
    
        //Emitting messages to Clients
        socket.on('chat', (data) =>{
	    if(!data.message.replace(/\s/g, '').length == 0){
		io.to(data.roomname).emit('chat', {username: data.username, message: data.message});
	    }
        })
    
        //Broadcasting the user who is typing
        socket.on('typing', (data) => {
            socket.broadcast.to(data.roomname).emit('typing', data.username)
        })
    
        //Remove user from memory when they disconnect
        socket.on('disconnecting', (data)=>{
            var rooms = Object.keys(socket.rooms);
            var socketId = rooms[1];
            var roomname = rooms[0];

	    try{
            	users[roomname].forEach((user, index) => {
                	if(user[socketId]){
                    		users[roomname].splice(index, 1);
                	}
            	});
	    }
	    catch(error){

	    }
    		
            //Send online users array
            io.to(roomname).emit('online-users', getUsers(users[roomname]))
        })
    })
}

module.exports = socket;
