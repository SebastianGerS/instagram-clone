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
  case ActionTypes.FETCH_MEDIAITEMS_START:
    return {
      ...state,
      isFetching: true
    }
  case ActionTypes.FETCH_MEDIAITEMS_SUCCESS:
  
    return { 
      ...state, 
      mediaItems: action.mediaItems.map(mediaItem => new MediaItem(mediaItem)),
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
          action.data.user
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
      currentUser: new User(
        action.data.user
      ),
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
      if (mediaItem._id === action.mediaItemId) {
        action.updatedFields.forEach(field => {
          if (Array.isArray(mediaItem[field.name])) {
            if (field.name === 'comments') {
              if (!field.value.user) {
                if(field.value.text) {
                  mediaItem[field.name].map((comment, index) => {
                    if (comment._id === field.value._id) {
                      comment.text = field.value.text;
                    }
                  });
                } else {
                  mediaItem[field.name].map((comment, index) => {
                    if (comment._id === field.value._id) {
                      mediaItem[field.name].splice(index,1);
                    }
                  });            
                }
              } else {
                  mediaItem[field.name].push(field.value);
              }
            } else if (mediaItem[field.name].includes(field.value)) {
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