var app = require('./app.js');

var server = app.listen(process.env.PORT || 5000, function() {
  console.log('Express is now listening to port:' + (process.env.PORT || 5000));
});

setInterval(function() {
  app.get('https://copygram-backend.herokuapp.com/mediaItems/all')
}, 300000); /*keeps the conection alive necasery becous heroku only 
precist deploydfiles not files uploded and saved with multer*/