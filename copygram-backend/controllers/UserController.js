var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var User = require('../models/User');

router.post('/register', function(req, res) {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    full_name: req.body.full_name,
    profile_picture: undefined,
    bio: undefined,
    website: undefined,
  }, function(error,user) {
      if(error) {
        return res.status(500).send("error ecured when trying to register new user with " + error);
      }

      return res.status(200).send(user);
      
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

