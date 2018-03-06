var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
router.use(bodyParser.urlencoded({ extended: true}));
var User = require('../models/User');

router.post('/register', function(req, res) {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    profile_picture: undefined,
    bio: undefined,
    website: undefined,
  }, function(error,user) {
    if(error) {
      var message = JSON.stringify({error: "error ecured when trying to register new user with " + error});
      return res.status(500).send(message);
    }

    return res.status(200).json(user);
      
  });
});
router.post('/login', function(req,res) {

  User.findOne({'email': req.body.email}, function(error,user) {

    if(error) {
      return res.status(500).json({error: "error ecured when trying to get user from database"});
    }
  
    bcrypt.compare(req.body.password, user.password)
      .then(function(accessGranted) {
        if (!accessGranted) return res.status(401).json({error: 'password is incorect'});
        return res.status(200).json(user);
      }).catch(function(error) {
        return res.status(401).json({error: 'an error occurred during login atempt pleas try again'});
      });

   

  });


});

router.get('/', function(req,res) {
  User.find({},function(error,users) {

    if(error) {
      return res.status(500).send("error ecured when trying to get users from database");
    }

    return res.status(200).send(users);
  
  });
});
router.get('/:id', function(req,res) {
  User.findById(req.params.id,function(error,user) {

    if(error) {
      return res.status(500).send("error ecured when trying to get user from database");
    }

    return res.status(200).send(user);
  
  });
});
router.delete('/:id', function(req,res) {
  User.findByIdAndRemove(req.params.id,function(error,user) {

    if(error) {
      return res.status(500).send("error ecured when trying to delete user from database");
    }

    return res.status(200).send('User ' + user.username + ' was deleted from database');
  
  });
});
router.put('/:id', function(req,res) {
  User.findByIdAndUpdate(req.params.id, req.body,{new: true},function(error,user) {

    if(error) {
      return res.status(500).send("error acurred when trying to update user from database");
    }

    return res.status(200).send(user);
  
  });
});
module.exports = router;

