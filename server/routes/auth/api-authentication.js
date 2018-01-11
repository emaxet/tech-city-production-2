const express  = require('express');
const router   = express.Router();
const authHelpers = require('./lib/auth-helpers');
const ENV = process.env.ENV || "development";
const jwt = require('jsonwebtoken');
const config = require('./config/config');

module.exports = () => {

	router.use(function(req, res, next) {
		  // check header or url parameters or post parameters for token
		let tokenHeader = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

		 // decode token
		if (tokenHeader) {
			token = tokenHeader.split(" ")[1];
			jwt.verify(token, config.jwtSecret, (err, decoded) => {      
			  if (err) {
			    return res.json({ success: false, message: 'Failed to authenticate token.' });    
			  } else {
			    // if everything is good, save to request for use in other routes
			    req.decoded = decoded;    
			    next();
			  }
			});
		} else {
		  	// if there is no token
		  	// return an error
		  	return res.status(403).json({ 
		      	success: false, 
		      	message: 'No token provided.' 
		  	});
		}
	});

	return router;
}