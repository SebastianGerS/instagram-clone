import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import InstagramActionTypes from './InstagramActionTypes';
import InstagramDispatcher from './InstagramDispatcher';
import MediaItem from './MediaItems';
import User from './User';
class InstagramStore extends ReduceStore {
  constructor() {
    super(InstagramDispatcher);
  }
  getInitialState() {
    return Immutable.OrderedMap();
  }
  
  reduce(state, action) {
    switch (action.type) {
    case InstagramActionTypes.ADD_ITEM:
      return state.set(action.item.id,new MediaItem(
        { 
          mediaItem: {
            id: action.item.id,
            images: action.item.images,
            type: action.item.type,
            comments: action.item.comments,
            likes: action.item.likes
          }
        }
      ));
      break;
    case InstagramActionTypes.SET_USER:
      return state.set(action.user.id, new User(
        {
          user: {
            id: action.user.id,
            username: action.user.username,
            full_name: action.user.full_name,
            profile_picture: action.user.profile_picture,
            bio: action.user.bio,
            website: action.user.website,
            counts: {
              media: action.user.counts.media,
              follows: action.user.counts.follows,
              followed_by: action.user.counts.followed_by,
            }
          }
        }
      ));
      break;
    }
  }
}

export default new InstagramStore();