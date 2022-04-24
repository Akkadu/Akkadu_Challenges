//Store connected Users
var users = {}

//Funtion to get users online in a room
function getUsers(arr){
    onlineUsers = []
    try{
    	arr.forEach((onlineUser) => {
        	onlineUsers.push(Object.values(onlineUser)[0])
    	})
    }
    catch(error){

    }
    return onlineUsers
}

module.exports = {getUsers, users};
