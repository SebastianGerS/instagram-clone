var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MediaItemSchema = Schema({
  images: {
    lowResolution: {
      url: String,
      width: Number,
      height: Number
    },
    thumbnail: {
      url: String,
      width: Number,
      height: Number
    },
    standardResolution: {
      url: String,
      width: Number,
      height: Number
    },
  },
  type: String,
  comments: [{type: String, ref: 'Comment' }],
  likes: [{type: Schema.Types.ObjectId, ref: 'User' }],
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag' }],
  caption: String,
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: String
},  { timestamps: { } });

mongoose.model('MediaItem', MediaItemSchema);

module.exports = mongoose.model('MediaItem');