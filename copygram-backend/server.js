var app = require('./app.js');
var port = 3001;

var server = app.listen(port, function() {
  console.log('Express is now listening to port:' + port);
});

