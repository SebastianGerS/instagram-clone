import Immutable from 'immutable';

const User = Immutable.Record({
  id: '',
  username: '',
  full_name: '',
  profile_picture: '',
  bio: '',
  website: '',
  counts: {
    media: '',
    follows: '',
    followed_by: '',
  }
});

export default User;