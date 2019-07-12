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
  console.log('New user connected');

  //default username
  socket.username = 'Anonymous';

  //listen on change_username
  socket.on('change_username', data => {
    socket.username = data.username;
  })

  //listen on new_message
  socket.on('new_message', data => {
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
  })
})