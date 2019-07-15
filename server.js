const express = require('express');
const app = express();
const server = app.listen(3000); // listen on port 3000
const io = require('socket.io')(server);

app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  res.render('index');
})

//io
io.on('connection', socket => {
  //default username
  socket.username = 'Anonymous';
  socket.emit('name', {
    name: socket.username
  })
  
  //show user connecting and disconnecting
  console.log(`User ${socket.username} (${socket.id}) connected`);
  socket.on('disconnect', () => {
    console.log(`User ${socket.username} (${socket.id}) disconnected`)
  });

  //listen on change_username
  socket.on('change_username', data => {
    console.log(`User ${socket.username} (${socket.id}) changed his name to ${data.username})`);
    io.sockets.emit('change_username', {
      oldUN: socket.username,
      newUN: data.username
    })
    socket.username = data.username;

  })

  //listen on new_message
  socket.on('new_message', data => {
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
    console.log(`User ${socket.username} (${socket.id}) : ${data.message}`);
  })
})