var mongoose = require('mongoose');

var MediaItemSchema = mongoose.Schema({
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
  comments: {
    count: Number,
    data: [
      {
        createdAt: String,
        text: String,
        from: {
          username: String,
          profilePicture: String,
          id: String,
          fullname: String
        },
        id: String
      }
    ]
  },
  likes: Number,
  tags: [],
  caption: String,
  user: {
    username: String,
    fullname: String,
    profilePicture: String,
    id: String
  },
  createdAt: String,
  location: String
});