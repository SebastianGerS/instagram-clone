var mongoose = require('mongoose');
var admin = require('./dbPasswords.js');

mongoose.connect("mongodb://" + admin.username + ":" + admin.password + "@ds157528.mlab.com:57528/copygram");