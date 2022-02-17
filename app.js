const createError = require('http-errors');
const express = require('express');
const path = require('path'); 
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const flash = require('connect-flash');//linha adicional
const session = require('express-session')//linha adicional



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const hbs = require('hbs');// LINHA ADICIONAL
hbs.registerPartials(path.join(__dirname + '/views/partials'));// LINHA ADICIONAL

const Dev = require('./models/Dev');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessão
app.use(session({
  secret: "cursodenode",//chave de acesso
  resave: true,
  saveUninitialized: true
}))

app.use(flash())


// rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
