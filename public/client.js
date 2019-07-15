(() => {
    //make connection
    const socket = io();

    const message = document.getElementById('message');
    const username = document.getElementById('username');
    const send_message = document.getElementById('send_message');
    const send_username = document.getElementById('send_username');
    const chatroom = document.getElementById('chatroom');

    //emit message
    send_message.addEventListener('click', () => {
        socket.emit('new_message', {
            message: message.value
        })
    })
    message.addEventListener('keydown', () => {
        if (event.key === 'Enter') {
            socket.emit('new_message', {
                message: message.value
            })
        }
    })


    //listen new messages
    socket.on('new_message', data => {
        const p = document.createElement('p');
        const textNode = `${data.username}: ${data.message}`;
        p.append(textNode);
        chatroom.append(p);
    })

    //emit a username
    send_username.addEventListener('click', () => {
        socket.emit('change_username', {
            username: username.value
        })
    })
    username.addEventListener('keydown', () => {
        if (event.key === 'Enter') {
            socket.emit('change_username', {
                username: username.value
            })
        }
    })

    //listen changed usernames
    socket.on('change_username', data => {
        const p = document.createElement('p');
        const textNode = `${data.oldUN} renamed : ${data.newUN}`;
        p.append(textNode);
        chatroom.append(p);
    })

    //listen new users 
    socket.on('connection', data => {
        const p = document.createElement('p');
        const textNode = `${data.user} joined`;
        p.append(textNode);
        chatroom.append(p);
    })
})();

