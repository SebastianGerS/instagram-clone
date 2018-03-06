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
  case ActionTypes.FETCH_USER_START:
    return {
      ...state,
      isFetching: true
    }
  case ActionTypes.FETCH_USER_SUCCESS:
    return {
      ...state, 
      user: [...state.user, new User(
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
      )],
     isLogedin:true
    };
  case ActionTypes.FETCH_USER_START:
    return {
      ...state,
      isFetching: false
    }
  case ActionTypes.FETCH_MEDIAITEMS_START:
    return {
      ...state,
      isFetching: true
    }
  case ActionTypes.FETCH_MEDIAITEMS_SUCCESS:
    return { 
      ...state, 
      mediaItems: [...state.mediaItems,new MediaItem(
        { 
          id: action.mediaItem.id,
          images: action.mediaItem.images,
          type: action.mediaItem.type,
          comments: action.mediaItem.comments,
          likes: action.mediaItem.likes,
          tags: [],
          caption: action.mediaItem.caption,
          user: {
            username: action.mediaItem.user.username,
            full_name: action.mediaItem.user.full_name,
            profile_picture: action.mediaItem.user.profile_picture,
            id: action.mediaItem.user.id
          },
          created_time: action.mediaItem.created_time,
          location: action.mediaItem.location
        }
      )],
      isFetching: false
    };
  case ActionTypes.FETCH_MEDIAITEMS_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  case ActionTypes.GET_MEDIA_ITEMS:
    return {
      ...state, mediaItems:[...state.mediaItems]
    };
  case ActionTypes.USER_REGISTRATION_START:
    return {
      ...state,
      isFetching: true
    };
  case ActionTypes.USER_REGISTRATION_SUCCESS:
    return {
      ...state,
      isFetching: false
    };
  case ActionTypes.USER_REGISTRATION_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  default:
    return state;
  }
}

export default Reducer;