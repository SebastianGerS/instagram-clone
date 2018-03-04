import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  id: '',
  images: '',
  type: '',
  comments: {
    count: null,
    data: [
      {
        created_time: '',
        text: '',
        from: {
          username: '',
          profile_picture: '',
          id: '',
          full_name: ''
        },
        id: ''
      }
    ]
  },
  likes:'',
  tags: [],
  caption: '',
  user: {
    username: '',
    full_name: '',
    profile_picture: '',
    id: null
  },
  created_time: '',
  location: null
});

export default MediaItem;