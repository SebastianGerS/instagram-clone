import Immutable from 'immutable';

const User = Immutable.Record({
  id: String,
  username: String,
  fullname: String,
  profilePicture: String,
  bio: String,
  website: String,
  counts: {
    media: Number,
    follows: Number,
    followedBy: Number,
  }
});

export default User;