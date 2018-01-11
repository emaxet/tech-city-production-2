const express = require('express');
const chats = express.Router();
const chatHelpers = require('./lib/chat-helpers');

module.exports = (knex) => {

	chats.post('/:city_name/chats', (req, res) => {
		chatHelpers.createChat(knex, req, (chats) => {
			res.json('Chat Added!');
		});
	});

  chats.get('/:city_name/chats/:chat_id', (req, res) => {
  	chatHelpers.findChatPostsById(knex, req, (posts) => {
  		res.json(posts);
  	});
  });

  return chats;

}