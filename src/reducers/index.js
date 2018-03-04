import ActionTypes from '../actions/ActionTypes';
import User from '../models/User';
import MediaItem from '../models/MediaItems';
import Immutable from 'immutable';

const initialState = {
  mediaItems:Immutable.OrderedMap(),
  user: Immutable.OrderedMap()
};

const Reducer = (state = initialState , action) => {
  switch (action.type) {
  case ActionTypes.SET_USER:
    return {...state, user:[...state.user, new User(
      {
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
    )]};
  case ActionTypes.ADD_ITEM:
    return { ...state, mediaItems: [...state.mediaItems,new MediaItem(
      { 
        id: action.item.id,
        images: action.item.images,
        type: action.item.type,
        comments: action.item.comments,
        likes: action.item.likes,
        tags: [],
        caption: action.item.caption,
        user: {
          username: action.item.user.username,
          full_name: action.item.user.full_name,
          profile_picture: action.item.user.profile_picture,
          id: action.item.user.id
        },
        created_time: action.item.created_time,
        location: action.item.location
      }
    )]};
  default:
    return state;
  }
}

export default Reducer;