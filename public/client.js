(() => {
    //make connection
    const socket = io.connect('http://localhost:3000');

    const message = document.getElementById('message');
    const username = document.getElementById('username');
    const send_message = document.getElementById('send_message');
    const send_username = document.getElementById('send_username');
    const chatroom = document.getElementById('chatroom');

    //emit message
    send_message.addEventListener('click', () => {
        socket.emit('new_message', {message : message.value})
    })

    //listen new messages
    socket.on('new_message', data => {
        console.log(data);
        const newMessageTag = document.createElement('p');
        const newMessageTextNode = `${data.username}: ${data.message}`;
        newMessageTag.append(newMessageTextNode);
        console.log(newMessageTag);
        chatroom.append(newMessageTag);
    })

    //emit a username
    send_username.addEventListener('click', () => {
        console.log(username.value);
        socket.emit('change_username', {
            username: username.value
        })
    })
})();