module.exports = {

	createChat: (knex, req, cb) => {
		knex('cities')
		.where({'name': req.params.city_name})
		.then((data) => {
			knex('forums')
			.insert({
			'city_id': data[0].id,
			'user_id': req.body.userId,
			'name': req.body.name,
			'subject': req.body.subject
			})
			.then(cb)
		});
	},

	findChatsByCity: (knex, cityName, cb) => {
		knex('forums')
		.join('cities', 'cities.id', 'forums.city_id')
		.select('forums.id', 'forums.name', 'forums.subject', 'forums.user_id', 'forums.city_id')
		.where({'cities.name': cityName})
		.then(cb);
	},

	findChatPostsById: (knex, req, cb) => {
		knex('posts')
		.fullOuterJoin('users', 'posts.name', 'users.username')
		.where({forum_id: req.params.chat_id})
		.select('posts.message', 'posts.name', 'users.image')
		.orderBy('posts.created_at', 'asc')
		.then(cb);
	},

	addNewPost: (knex, data, cb) => {
		knex('posts')
		.insert({
			forum_id: data.chatId,
			name: data.username,
			message: data.message
		})
		.then(cb);
	},

	updateConnectedUsers: (io, connections, socketData) => {
		const chatUsers = [];
  		connections.forEach((connection) => {
	    	if (connection.roomId === socketData.roomId) {
	      		chatUsers.push(connection);
	    	}
  		});
  		io.to(`chat${socketData.roomId}`).emit('connection event', chatUsers);
	},

	findChatsFromSearchQuery: (knex, req, cb) => {
		const query = req.params.query; 
		knex('forums')
		.join('cities', 'forums.city_id', 'cities.id')
		.where(function() {
			this.where('forums.name','ilike', `%${query}%`).orWhere('forums.subject', 'ilike', `%${query}%`)
		})
		.andWhere({'cities.name': req.params.city_name})
		.select('forums.name', 'forums.subject')
		.then(cb);
	}
}