import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  _id: String,
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
  comments: Array,
  likes: Array,
  tags: Array,
  caption: String,
  user: {
    username: String,
    fullname: String,
    profilePicture: String,
    _id: String
  },
  createdAt: String,
  location: String
});

export default MediaItem;