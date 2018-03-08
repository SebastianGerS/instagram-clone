var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/User');
var Tag = require('../models/Tag');
var MediaItem = require('../models/MediaItem');
var VerifyToken = require('../middleware/verifyToken');

router.use(bodyParser.urlencoded({ extended: true}));

router.post('/', VerifyToken ,function(req,res) {
  var tags = [];
  var tagCounter = 0;
  req.body.tags.forEach(tagname => {
    var tag = Tag.findOne({tagname: tagname},function(err, tag) {
      if (err) return res.status(500).json({error: 'error retreving tag'});

      if (!tag) {
        Tag.create({tagname: tagname}, function(error, newtag) {
          if (error) return res.status(500).json({error: 'error retreving tag'});
          tags.push(newtag._id);
        } );
      } else {
        tags.push(tag._id);
      }
      tagCounter++;
      if(tagCounter == req.body.tags.length) {
        MediaItem.create({
          images: {
            lowResolution: {
              url: req.body.images.lowResolution.url,
              width: req.body.images.lowResolution.width,
              height: req.body.images.lowResolution.height
            },
            thumbnail: {
              url: req.body.images.thumbnail.url,
              width: req.body.images.thumbnail.width,
              height: req.body.images.thumbnail.height
            },
            standardResolution: {
              url: req.body.images.standardResolution.url,
              width: req.body.images.standardResolution.width,
              height: req.body.images.standardResolution.height
            },
          },
          type: req.body.type,
          comments: [],
          likes: 0,
          tags: tags,
          caption: req.body.caption,
          user: req.userId,
          location: req.body.location
        }, function(error,mediaItem) {
          if(error) {
            var message = JSON.stringify({error: "error occurred when trying to add new mediaItem with " + error});
            return res.status(500).send(message);
          }
         
          return res.status(200).json(mediaItem);
            
        });
      }
    });
  });
});
router.get('/selfe',VerifyToken, function(req,res) {
  MediaItem.find({user: req.userId}).populate({path: 'user'}).lean().exec(function(err, mediaItems) {
    if (err) return res.status(500).json({error: 'error retreving mediaitems'});
    return res.json(mediaItems);
  });
});
module.exports = router;