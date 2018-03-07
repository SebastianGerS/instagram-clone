var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = Schema({
  text: String,
  user: {type: Schema.Types.ObjectId, ref: 'User' },
  mediaItem: {type: Schema.Types.ObjectId, ref: 'MediaItem' },
},  { timestamps: { } });

mongoose.model('Comment', CommentSchema);

module.exports = mongoose.model('Comment');