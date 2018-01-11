const express = require('express');
const users = express.Router();

const userHelper = require('./lib/user-helpers');

module.exports = (knex) => {

  users.get('/users/:user_id/chats/:city_name', (req, res) => {
  		userHelper.findChatsByUserId(knex, req.params, (chats) => {
  			res.json(chats);
  		});
  	});

  users.get('/users/:username', (req, res) => {
  	userHelper.getProfileData(knex, req.params, (data) => {
  		res.json(data);
  	});
  });

  return users;
};

