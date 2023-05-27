require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const checkFileMiddleware = require('./middlewares/checkFile');
const configureRequestMetadata = require('./middlewares/configureRequestMetadata');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
global.app = app;

app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(configureRequestMetadata);

// eslint-disable-next-line max-len
// app.use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, './../dist', req.path)));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/', express.static(path.join(__dirname, 'dist')));

// app.use('/api', [checkFileMiddleware], apiRouter);
app.use('/api', apiRouter);
app.use('/', [checkFileMiddleware], indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  // eslint-disable-next-line no-param-reassign
  res.locals.message = err.message;
  // eslint-disable-next-line no-param-reassign
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
