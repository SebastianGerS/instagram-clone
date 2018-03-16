var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/User');
var VerifyToken = require('../middleware/verifyToken');
var multer = require('multer');
var uuidv1 = require("uuid");
var fs = require('fs');

var storage = multer.diskStorage({
  destination: './public/images',
  filename(req,data,cb) {
    cb(null, uuidv1() + data.originalname);
  },
});

var upload = multer({storage});

router.use(bodyParser.urlencoded({ extended: true}));

router.post('/register', function(req, res) {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    profilePicture: '',
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
    var token = jwt.sign({ _id: user._id }, config.secret, {
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
        if (!accessGranted) return res.status(401).json({error: 'password is incorect'});
        var token = jwt.sign({ _id: user._id }, config.secret, {
          expiresIn: 3600
        });
        return res.status(200).json({user: user, token: token});
      }).catch(function(error) {
        return res.status(401).json({error: 'an error occurred during login atempt pleas try again'});
      });
  });
});

router.get('/me',VerifyToken ,function(req,res) {
  console.log(req);
  User.findById(req.userId,function(error,user) {

    if(error) return res.status(500).send("error occurred when trying to get user from database" +  error);
    if (!user) return res.status(500).send("no user was found");
    return res.status(200).send(user);
  
  });
});

router.post('/me',[VerifyToken,upload.single('profilePicture')] ,function(req,res) {
  User.findById(req.userId,function(error,user) {

    if(error) return res.status(500).send("error occurred when trying to get user from database" +  error);
    if (!user) return res.status(500).send("no user was found");

    if (req.file) {
      if(user.profilePicture.length !== 0) {
        fs.unlinkSync('./public'+user.profilePicture);
      }
      user.profilePicture =  '/images/' + req.file.filename;
    }

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.fullname) {
      user.fullname = req.body.fullname;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    user.save();

    return res.status(200).json({message: 'user was sucessfully updated'});
  
  });
});
module.exports = router;