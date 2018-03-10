var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/User');

router.use(bodyParser.urlencoded({ extended: true}));

router.post('/register', function(req, res) {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    profilePicture: 'https://cdn.pixabay.com/photo/2017/11/16/09/32/matrix-2953869_960_720.jpg',
    bio: '',
    website: '',
    mediaItems: [],
    follows: [],
    followedBy: [],
  }, function(error,user) {
    if(error) {
      var message = JSON.stringify({error: "error occurred when trying to register new user with " + error});
      return res.status(500).send(message);
    }
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 3600
    });
    return res.status(200).json({user: user, token: token});
      
  });
});
router.post('/login', function(req,res) {
  User.findOne({'email': req.body.email}, function(error,user) {
    if(error) {
      return res.status(500).json({error: "error occurred when trying to get user from database"});
    }else if (!user) {
      return res.status(422).json({error: "email is not registered"});
    }
   
  
    bcrypt.compare(req.body.password, user.password)
      .then(function(accessGranted) {
        console.log(user);
        console.log(accessGranted);
        if (!accessGranted) return res.status(401).json({error: 'password is incorect'});
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 3600
        });
        return res.status(200).json({user: user, token: token});
      }).catch(function(error) {
        return res.status(401).json({error: 'an error occurred during login atempt pleas try again'});
      });
  });
});

module.exports = router;