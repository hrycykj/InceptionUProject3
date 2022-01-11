var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = process.env.PORT || 5000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/ping', (req, res)=>{
  console.log('Server health check')
  res.send({response: 'pong'})
});
app.use('/users', usersRouter);

app.use('/', indexRouter);
app.use('/', express.static('../client/build'))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname,"../client/build","index.html"))
})



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

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`))

module.exports = app;
