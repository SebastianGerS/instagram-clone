import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  id: '',
  images: '',
  type: '',
  comments: '',
  likes:''
});

export default MediaItem;