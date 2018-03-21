import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  _id: String,
  images: {
    url: String,
    id: String
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