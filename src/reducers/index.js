import ActionTypes from '../actions/ActionTypes';
import User from '../models/User';
import MediaItem from '../models/MediaItems';
import Immutable from 'immutable';

const initialState = {
  mediaItems:Immutable.OrderedMap(),
  user: Immutable.OrderedMap(),
  isLogedin: false,
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
          fullname: action.user.full_name,
          profilePicture: action.user.profile_picture,
          bio: action.user.bio,
          website: action.user.website,
          counts: {
            media: action.user.counts.media,
            follows: action.user.counts.follows,
            followedBy: action.user.counts.followe_by,
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
          images: {
            lowResolution: {
              url: action.mediaItem.images.low_resolution.url,
              width: action.mediaItem.images.low_resolution.width,
              height: action.mediaItem.images.low_resolution.height
            },
            thumbnail: {
              url: action.mediaItem.images.thumbnail.url,
              width: action.mediaItem.images.thumbnail.width,
              height: action.mediaItem.images.thumbnail.height
            },
            standardResolution: {
              url: action.mediaItem.images.standard_resolution.url,
              width: action.mediaItem.images.standard_resolution.width,
              height: action.mediaItem.images.standard_resolution.height
            },
          },
          type: action.mediaItem.type,
          comments: action.mediaItem.comments,
          likes: action.mediaItem.likes,
          tags: [],
          caption: action.mediaItem.caption,
          user: {
            username: action.mediaItem.user.username,
            fullname: action.mediaItem.user.full_name,
            profilePicture: action.mediaItem.user.profile_picture,
            id: action.mediaItem.user.id
          },
          createdAt: action.mediaItem.created_time,
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
      user: [...state.user, new User(
        {
          id: action.data.user._id,
          username: action.data.user.username,
          fullname: action.data.user.fullname,
          profilePicture: action.data.user.profilePicture,
          bio: action.data.user.bio,
          website: action.data.user.website,
          counts: {
            media: +action.data.user.counts.media,
            follows: +action.data.user.counts.follows,
            followedBy: +action.data.user.counts.followedBy,
          }
        }
      )],
      token: action.data.token,
      isFetching: false,
      isLogedin: true
    };
  case ActionTypes.USER_REGISTRATION_FAILURE:
    return {
      ...state,
      isFetching: false
    };
    case ActionTypes.USER_LOGIN_START:
    return {
      ...state,
      isFetching: true
    };
  case ActionTypes.USER_LOGIN_SUCCESS:
    return {
      ...state,
      user: [...state.user, new User(
        {
          id: action.data.user._id,
          username: action.data.user.username,
          full_name: action.data.user.fullname,
          profilePicture: action.data.user.profilePicture,
          bio: action.data.user.bio,
          website: action.data.user.website,
          counts: {
            media: +action.data.user.counts.media,
            follows: +action.data.user.counts.follows,
            followedBy: +action.data.user.counts.followedBy,
          }
        }
      )],
      token: action.data.token,
      isFetching: false,
      isLogedin: true
    };
  case ActionTypes.USER_LOGIN_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  default:
    return state;
  }
}

export default Reducer;