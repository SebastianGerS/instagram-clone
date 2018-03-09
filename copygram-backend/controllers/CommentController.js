var express = require('express');
var router = express.Router({mergeParams: true});
var bodyParser = require('body-parser');
var Comment = require('../models/Comment');
var VerifyToken = require('../middleware/verifyToken');
var MediaItem = require('../models/MediaItem');

router.use(bodyParser.urlencoded({ extended: true}));

router.post('/', VerifyToken ,function(req,res) {
  Comment.create({
    text: req.body.text,
    user: req.userId,
    mediaItem: req.params.id,
  }, function(error, comment) {
    if (error) return res.json({error: 'error creating comment'});
    MediaItem.findById(req.params.id, function(err, mediaItem) {
      if (err) return res.json({error: 'error binding comment to mediaitem'});
      mediaItem.comments.push(comment._id);
      mediaItem.save();
      return res.json('comment created');
    });  
  });
});


module.exports = router;