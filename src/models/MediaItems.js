import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  id: String,
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
  likes: Array,
  tags: Array,
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

export default MediaItem;