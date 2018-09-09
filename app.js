/* Package requirements */
const createError = require('http-errors'),
    express = require('express'),
    session = require('express-session'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan');

/* Routers */
const indexRouter = require('./routes/index'),
    passRouter = require('./routes/pass'),
    failRouter = require('./routes/fail'),
    loginRouter = require('./routes/login'),
    hydroRouter = require('./routes/hydro'),
    registerRouter = require('./routes/register');

/* App definition */
let app = express();

/* View engine setup (EJS) */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* App configuration */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'Super Secret', resave: false, saveUninitialized: false }));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Catches '/json/version' and '/favicon.ico' GET requests
app.get(['/json*', '/favicon.ico'], function(req, res) {
   res.status(204);
});

/* Pass request through the routers */
// app.route('/').use(indexRouter, passRouter, failRouter, loginRouter, hydroRouter); TODO: Try later
app.use('/', indexRouter);
app.use('/', passRouter);
app.use('/', failRouter);
app.use('/', loginRouter);
app.use('/', hydroRouter);
app.use('/', registerRouter);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

//* Error handler */
app.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* Specifies Node.js port */
app.listen(3000, function() {
  console.log('Listening on port 3000')
});

module.exports = app;
