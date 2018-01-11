const express = require('express');
const chats = express.Router();
const chatHelpers = require('./lib/chat-helpers');

module.exports = (knex) => {

	chats.get('/:city_name/chats', (req, res) => {
	    chatHelpers.findChatsByCity(knex, req.params.city_name, (chats) => {
	    	res.json(chats);
	    });
  	});

  	chats.get('/:city_name/chats/search/:query', (req, res) => {
	    chatHelpers.findChatsFromSearchQuery(knex, req, (chats) => {
	      res.json(chats);
	    });
  	});

	return chats;
}
