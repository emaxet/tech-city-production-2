const express  = require('express');
const router   = express.Router();
const passInit = require('./config/passport');
const logout   = require('express-passport-logout');
const authHelpers = require('./lib/auth-helpers');


module.exports = (knex, passport) => {

  // initialize passport configuration
  passInit(knex, passport);

  router.post('/register', (req, res, next) => {

    authHelpers.emailExists(req.body.email, (users) => {

      const validationResult = authHelpers.validateRegisterForm(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: validationResult.message,
          errors: validationResult.errors
        });
      }

      return passport.authenticate('local-signup', (err, token, data) => {
        if (err) {
          if (err.name === 'UsernameExists') {
            return res.status(409).json({
              success: false,
              message: 'Check the form for errors.',
              errors: {
                username: err.message
              }
            });
          } else if (err.name === 'EmailExists') {
            return res.status(409).json({
              success: false,
              message: 'Check the form for errors.',
              errors: {
                email: err.message
              }
            });
          }

          return res.status(400).json({
            success: false,
            message: 'Could not process the form.'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Welcome! You have successfully signed up!',
          token: token,
          data: data

        });
      })(req, res, next);

    });
  });

  router.post('/login', (req, res, next) => {

    const validationResult = authHelpers.validateLoginForm(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    return passport.authenticate('local-login', (err, token, data) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.'
        });
      }

      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token: token,
        data: data
      });
    })(req, res, next);
  });

  router.get('/logout', function (req, res){
    res.clearCookie("connect.sid");
    res.redirect('/api/v1/users');
  });

  return router;

};
