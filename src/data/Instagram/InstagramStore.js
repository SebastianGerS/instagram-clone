import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import InstagramActionTypes from './InstagramActionTypes';
import InstagramDispatcher from './InstagramDispatcher';
import MediaItem from './MediaItems';

class InstagramStore extends ReduceStore {
  constructor() {
    super(InstagramDispatcher);
  }
  getInitialState() {
    return Immutable.OrderedMap();
  }
  componentWillMount() {
    console.log('test');
  }
  reduce(state, action) {
    switch (action.type) {
      case InstagramActionTypes.ADD_ITEM:
        return state.set(action.item.id,new MediaItem(
          {
            id: action.item.id,
            images: action.item.images,
            type: action.item.type,
            comments: action.item.comments,
            likes: action.item.likes
          }
        ));
        return state;
        break;
    }
  }
}

export default new InstagramStore();