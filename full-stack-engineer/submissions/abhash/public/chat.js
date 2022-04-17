const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const roomMessage = document.querySelector('.room-message');
const users = document.querySelector('.users');

//Socket server URL
const socket = io.connect('http://localhost:3000');

//Fetch URL Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const roomname = urlParams.get('roomname');
console.log(username, roomname);

//Display the roomname the user is connected to
roomMessage.innerHTML = `Connected in room ${roomname}`

//Emitting username and roomname of newly joined user to server
socket.emit('joined-user', {
    username: username,
    roomname: roomname
})

//Sending data when user clicks send
send.addEventListener('click', () =>{
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    message.value = '';
})

//Sending username if the user is typing
message.addEventListener('keypress', () => {
    socket.emit('typing', {username: username, roomname: roomname})
})

//Displaying if new user has joined the room
socket.on('joined-user', (data)=>{
    output.innerHTML += '<p>--> <strong><em>' + data.username + ' </strong>has Joined the Room</em></p>';
})

//Displaying the message sent from user
socket.on('chat', (data) => {
    var d = new Date();
    var current_time = d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

    if(username == data.username){
	output.innerHTML += '<p style="text-align:right"> ' + data.message + '</p>';
        output.innerHTML += '<p style="text-align:right">'+ current_time +'</p>';
    }else{
    	output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
	output.innerHTML += '<p>' + current_time + '</p>';
    }    
    feedback.innerHTML = '';
    document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight

})

//Displaying if a user is typing
socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})


