var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var admin = require('../dbpasswords');
router.use(bodyParser.urlencoded({ extended: true}));
var User = require('../models/User');
var verifyToken = require('../middleware/verifyToken');
router.post('/register', function(req, res) {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    profile_picture: 'https://cdn.pixabay.com/photo/2017/11/16/09/32/matrix-2953869_960_720.jpg',
    bio: '',
    website: '',
    counts: {
      media: 0,
      follows: 0,
      followed_by: 0,
    }
  }, function(error,user) {
    if(error) {
      var message = JSON.stringify({error: "error occurred when trying to register new user with " + error});
      return res.status(500).send(message);
    }
    var token = jwt.sign({ id: user._id }, admin.secret, {
      expiresIn: 3600
    });
    return res.status(200).json({user: user, token: token});
      
  });
});
router.post('/login', function(req,res) {

  User.findOne({'email': req.body.email}, function(error,user) {

    if(error) {
      return res.status(500).json({error: "error occurred when trying to get user from database"});
    }
  
    bcrypt.compare(req.body.password, user.password)
      .then(function(accessGranted) {
        if (!accessGranted) return res.status(401).json({error: 'password is incorect'});
        var token = jwt.sign({ id: user._id }, admin.secret, {
          expiresIn: 3600
        });
        return res.status(200).json({user: user, token: token});
      }).catch(function(error) {
        return res.status(401).json({error: 'an error occurred during login atempt pleas try again'});
      });
  });
});

router.get('/',verifyToken ,function(req,res) {
  User.find({},function(error,users) {

    if(error) {
      return res.status(500).send("error occurred when trying to get users from database");
    }

    return res.status(200).send(users);
  
  });
});
router.get('/:id',verifyToken ,function(req,res) {
  User.findById(req.params.id,function(error,user) {

    if(error) {
      return res.status(500).send("error occurred when trying to get user from database");
    }

    return res.status(200).send(user);
  
  });
});
router.delete('/:id', verifyToken,function(req,res) {
  User.findByIdAndRemove(req.params.id,function(error,user) {

    if(error) {
      return res.status(500).send("error occurred when trying to delete user from database");
    }

    return res.status(200).send('User ' + user.username + ' was deleted from database');
  
  });
});
router.put('/:id', verifyToken,function(req,res) {
  User.findByIdAndUpdate(req.params.id, req.body,{new: true},function(error,user) {

    if(error) {
      return res.status(500).send("error occurred when trying to update user from database");
    }

    return res.status(200).send(user);
  
  });
});
module.exports = router;

