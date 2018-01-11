const express      = require('express');
const app          = express();
const chatHelpers  = require('./routes/api/lib/chat-helpers');

module.exports =  {

	ioInit: (knex, server) => {
		app.use(express.static('../client/public'));

		// SETTING UP SOCKET.IO SERVER

	const io = require('socket.io').listen(server);

    let connections = [];

    io.on('connection', function(socket){
      console.log('a user connected');
      const socketData = {
        roomId: socket.handshake.query.chatId,
        username: socket.handshake.query.username,
        userImage: socket.handshake.query.userImage
      }
      socket.join(`chat${socketData.roomId}`);
      connections.push(socketData);
      chatHelpers.updateConnectedUsers(io, connections, socketData);

      socket.on('chat message', (data) => {
        chatHelpers.addNewPost(knex, data, () => {
          io.to(`chat${socketData.roomId}`).emit(`chat message`, data);
        })
      });
      socket.on('disconnect', function(){
        const connectionsIndex = connections.indexOf(socketData);
        connections.splice(connectionsIndex, 1);
        chatHelpers.updateConnectedUsers(io, connections, socketData);
      });
    });
	}

}