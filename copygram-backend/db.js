var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect("mongodb://" + config.username + ":" + config.password + "@ds157528.mlab.com:57528/copygram");