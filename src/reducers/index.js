import ActionTypes from '../actions/ActionTypes';
import User from '../models/User';
import MediaItem from '../models/MediaItems';
import Token from '../models/Token';
import Immutable from 'immutable';

const initialState = {
  mediaItems:Immutable.OrderedMap(),
  currentUser: Immutable.OrderedMap(),
  isLogedin: false,
  token: Immutable.Record(),
  currentUserId: ''
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
          id: action.mediaItem._id,
          images: {
            lowResolution: {
              url: action.mediaItem.images.lowResolution.url,
              width: action.mediaItem.images.lowResolution.width,
              height: action.mediaItem.images.lowResolution.height
            },
            thumbnail: {
              url: action.mediaItem.images.thumbnail.url,
              width: action.mediaItem.images.thumbnail.width,
              height: action.mediaItem.images.thumbnail.height
            },
            standardResolution: {
              url: action.mediaItem.images.standardResolution.url,
              width: action.mediaItem.images.standardResolution.width,
              height: action.mediaItem.images.standardResolution.height
            },
          },
          type: action.mediaItem.type,
          comments: action.mediaItem.comments,
          likes: action.mediaItem.likes,
          tags: [action.mediaItem.tags],
          caption: action.mediaItem.caption,
          user: {
            username: action.mediaItem.user.username,
            fullname: action.mediaItem.user.fullname,
            profilePicture: action.mediaItem.user.profilePicture,
            id: action.mediaItem.user._id
          },
          createdAt: action.mediaItem.createdAt,
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
      currentUser: [ new User(
        {
          id: action.data.user._id,
          username: action.data.user.username,
          fullname: action.data.user.fullname,
          profilePicture: action.data.user.profilePicture,
          bio: action.data.user.bio,
          website: action.data.user.website,
          mediaItems: action.data.user.mediaItems,
          follows: action.data.user.follows,
          followedBy: action.data.user.followedBy,
        }
      )],
      token: new Token({value: action.data.token}),
      currentUserId: action.data.user._id,
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
      currentUser: [ new User(
        {
          id: action.data.user._id,
          username: action.data.user.username,
          fullname: action.data.user.fullname,
          profilePicture: action.data.user.profilePicture,
          bio: action.data.user.bio,
          website: action.data.user.website,
          mediaItems: action.data.user.mediaItems,
          follows: action.data.user.follows,
          followedBy: action.data.user.followedBy,
        }
      )],
      token: new Token({value: action.data.token}),
      currentUserId: action.data.user._id,
      isFetching: false,
      isLogedin: true
    };
  case ActionTypes.USER_LOGIN_FAILURE:
    return {
      ...state,
      isFetching: false
    };
  case ActionTypes.USER_LOGOUT:
    return {
      ...state,
      curentUser: Immutable.OrderedMap(),
      isLogedin: false,
      token: Immutable.OrderedMap()
    };
  case ActionTypes.MEDIAITEM_UPDATE_START:
    return {
      ...state,
      isUpdating: true
    };
  case ActionTypes.MEDIAITEM_UPDATE_SUCCESS:
    const mediaItems = [...state.mediaItems.map(mediaItem => {
      
      if(mediaItem.id === action.mediaItemId) {
        action.updatedFields.forEach(field => {
          if(Array.isArray(mediaItem[field.name])) {
            if (mediaItem[field.name].includes(field.value)) {
              mediaItem[field.name].map((user, index) => {
                if (user === field.value) {
                  mediaItem[field.name].splice(index,1);
                }
              });
            } else {
              mediaItem[field.name].push(field.value);
            }
          } else {
            mediaItem[field.name] = field.value;
          }
         
        });
      }
      return mediaItem;
    })];
    return {
      ...state,
      mediaItems: [...mediaItems],
      isUpdating: false
    };
  case ActionTypes.MEDIAITEM_UPDATE_FAILURE:
    return {
      ...state,
      isUpdating: false
    };
  default:
    return state;
  }
}

export default Reducer;