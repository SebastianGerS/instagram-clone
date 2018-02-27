import Immutable from 'immutable';

const MediaItem = Immutable.Record({
  mediaItem: {
    id: '',
    images: '',
    type: '',
    comments: '',
    likes:''
  }
});

export default MediaItem;