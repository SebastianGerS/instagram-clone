var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect("mongodb://" + config.username + ":" + config.password + "@ds157528.mlab.com:57528/copygram");

mongoose.connection.on('error', function (error) {
  if (error) console.log('error while trying to connect to database');
});