var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: {type: String, minlength: [8, 'passwords must be 8 characters or longer']},
  fullname: String,
  profile_picture: String,
  bio: String,
  website: String,
});

UserSchema.pre('save', function(next) {
  var user = this;
  var rounds = 5;

  bcrypt.genSalt(rounds, function(error, salt) {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) return next(error);
      user.password = hash;
      next();
    })
  });
})
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');