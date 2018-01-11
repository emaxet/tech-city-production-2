const ENV = process.env.ENV || "development";

const knexConfig = require('../../../../knexfile');
const knex       = require('knex')(knexConfig[ENV]);
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const validator  = require('validator');

module.exports = {

  findUserByEmail: (email, cb, err) => {
     knex('users')
     .join('users_cities', 'users.id', 'users_cities.user_id')
     .join('cities', 'users_cities.city_id', 'cities.id')
     .where({'users.email': email})
     .select('users.first_name', 'users.last_name', 'users.email', 'users.username', 'users.image', 'users.bio', 'users.id', 'users.password', 'cities.name')
     .then(cb)
     .catch(err)
  },

  findUserByUsername: (username, cb, err) => {
    knex('users')
    .where({username: username})
    .then(cb)
    .catch(err)
  },

  registerNewUser: (req, cb, err) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    knex('users')
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      username: req.body.username,
      image: req.body.pic,
      bio: req.body.bio,
      role_id: req.body.role_id
    })
    .returning('*')
    .then(cb)
  },

  addNewUserCity: (req, user, cb) => {
    knex('cities')
    .where({'cities.name': req.body.city})
    .then((city) => {
      console.log(city[0].id, user[0].id)
      knex('users_cities')
      .insert({
        user_id: user[0].id,
        city_id: city[0].id
      })
      .then(cb)
    })
  },

  validPassword: (user, password) => {
    return bcrypt.compareSync(password, user[0].password);
  },

  emailExists: (email, cb) => {
    knex('users')
    .where({email: email})
    .then(cb)
  },

  validateRegisterForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
      isFormValid = false;
      errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
      isFormValid = false;
      errors.password = 'Password must have at least 6 characters.';
    }

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
      isFormValid = false;
      errors.username = 'Please provide your username.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  },

  validateLoginForm: (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
      isFormValid = false;
      errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  }

}