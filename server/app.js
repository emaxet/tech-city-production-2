const ENV = process.env.ENV || "development";

const express      = require('express');
const app          = express();
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const knexConfig   = require('../knexfile');
const knex         = require('knex')(knexConfig[ENV]);
const passport     = require('passport');
const session      = require('express-session');
const bodyParser   = require('body-parser');
const ioServer     = require('./io-server');

// INITIALIZE SOCKET.IO SERVER ON PORT 8080

ioServer.ioInit(knex);

// DEFINE AUTH ROUTERS

const auth    = require('./routes/auth/routes');
const apiAuth = require('./routes/auth/api-authentication');

// DEFINE API ROUTERS

const index  = require('./routes/api/index');
const users  = require('./routes/api/users');
const events = require('./routes/api/events');
const eventsNoAuth = require('./routes/api/eventsNoAuth');
const jobs   = require('./routes/api/jobs');
const jobsNoAuth = require('./routes/api/jobsNoAuth');
const cities = require('./routes/api/cities');
const chats  = require('./routes/api/chats');
const chatsNoAuth = require('./routes/api/chatsNoAuth');

// SET API SERVER PORT

app.set('port', (process.env.PORT || 5000));

// SETUP VIEW ENGINE

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// MIDDLEWARE
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client', 'build')));

// MOUNT API ROUTES (NO AUTH REQUIRED)

app.use('/session', auth(knex, passport));
app.use('/api/v1', cities(knex));
app.use('/api/v1', users(knex));
app.use('/api/v1', eventsNoAuth(knex));
app.use('/api/v1', jobsNoAuth(knex));
app.use('/api/v1', chatsNoAuth(knex));

// API AUTHENTICATION MIDDLEWARE

// app.use('*', apiAuth());

// MOUNT API ROUTES (AUTH REQUIRED)

app.use('/api/v1', events(knex));
app.use('/api/v1', jobs(knex));
app.use('/api/v1', cities(knex));
app.use('/api/v1', chats(knex));

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at port ${app.get('port')}/`); // eslint-disable-line no-console
});


