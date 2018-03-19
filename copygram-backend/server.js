var app = require('./app.js');

var server = app.listen(process.env.PORT, function() {
  console.log('Express is now listening to port:' + process.env.PORT);
});

