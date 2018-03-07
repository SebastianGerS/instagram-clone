import Immutable from 'immutable';

const User = Immutable.Record({
  id: String,
  username: String,
  fullname: String,
  profilePicture: String,
  bio: String,
  website: String,
  mediaItems: Array,
  follows: Array,
  followedBy: Array,
});

export default User;