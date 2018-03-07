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
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }],
  likes: Number,
  tags: [{type: Schema.Types.ObjectId, ref: 'Tag' }],
  caption: String,
  user: {type: Schema.Types.ObjectId, ref: 'User' },
  location: String
},  { timestamps: { } });

mongoose.model('MediaItem', MediaItemSchema);

module.exports(mongoose.model('MediaItem'));