'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index'); // Make this redirect to Dashboard probably
// const dashboard = require('./routes/dashboard');
// const paperstacks = require('./routes/paperstacks');
// const extractions = require('./routes/extractions');
const auth = require('./routes/auth');

const app = express();

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// Middlewares
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
}));
app.use(logger('dev'));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // DELETE THIS!!!????

// Session
app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'wooooLaaaa',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

app.use((req, res, next) => {
  app.locals.user = req.session.currentUser;
  next();
});

// Routes
app.use('/', index);
// app.use('/dashboard', dashboard);
// app.use('/paperstack', paperstacks);
// app.use('/extractions', extractions);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({error: 'not found'});
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({error: 'unexpected'});
  }
});

module.exports = app;
