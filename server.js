const express = require('express');
const app = express();
const server = app.listen(3300);
const mongo = require("mongoose")
const client = require("socket.io").listen(server).sockets;

//connect to mongo

mongo.connect('mongodb+srv://Admin:Admin1234@becodemessenger-qswmo.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

let db = mongo.connection;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

db.on('error', console.error.bind(console, 'connection error:'));

db.on('open', () => {
  console.log("Mongoose connected")

  // Connect to Socket.io
  client.on('connection', function (socket) {
    let chat = db.collection('chats');

    // Create function to send status
    sendStatus = function (s) {
      socket.emit('status', s);
    }

    // Get chats from mongo collection
    chat.find().limit(100).sort({
      _id: 1
    }).toArray(function (err, res) {
      if (err) {
        throw err;
      }

      // Emit the messages
      socket.emit('output', res);
    });

    // Handle input events
    socket.on('input', function (data) {
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if (name == '' || message == '') {

        // Send error status
        sendStatus('Please enter a name and message');
      } else {

        // Insert message
        chat.insertOne({
          name: name,
          message: message
        }, function () {
          client.emit('output', [data]);

          // Send status object
          sendStatus({
            message: 'Message sent',
            clear: true
          });
        });
      }
    });

    // Handle clear
    socket.on('clear', function (data) {
      // Remove all chats from collection
      chat.deleteOne({}, function () {
        // Emit cleared
        socket.emit('cleared');
      });
    });
  });
});
