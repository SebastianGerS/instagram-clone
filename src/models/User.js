import Immutable from 'immutable';

const User = Immutable.Record({
  id: String,
  username: String,
  full_name: String,
  profile_picture: String,
  bio: String,
  website: String,
  counts: {
    media: Number || null,
    follows: Number || null,
    followed_by: Number || null,
  }
});

export default User;