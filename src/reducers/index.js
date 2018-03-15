import ActionTypes from '../actions/ActionTypes';
import User from '../models/User';
import MediaItem from '../models/MediaItems';
import Token from '../models/Token';
import Immutable from 'immutable';

const initialState = {
  mediaItems: Immutable.OrderedMap(),
  currentUser: Immutable.OrderedMap(),
  isLogedin: false,
  token: Immutable.Record(),
  currentUserId: '',
  user: Immutable.Record(),
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
      user: new User(action.user),
      isFetching: false
    }
    case ActionTypes.FETCH_USER_FAILURE:
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
      currentUser: new User(
          action.data.user
      ),
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
  case ActionTypes.MEDIAITEM_CREATE_START:
    return {
      ...state,
      isUpdating: true
    };
  case ActionTypes.MEDIAITEM_CREATE_SUCCESS:
    
    return {
      ...state,
      isUpdating: false
    };
  case ActionTypes.MEDIAITEM_CREATE_FAILURE:
    return {
      ...state,
      isUpdating: false
    };
    case ActionTypes.MEDIAITEM_DELETE_START:
    return {
      ...state,
      isUpdating: true
    };
  case ActionTypes.MEDIAITEM_DELETE_SUCCESS:
    
    return {
      ...state,
      isUpdating: false
    };
  case ActionTypes.MEDIAITEM_DELETE_FAILURE:
    return {
      ...state,
      isUpdating: false
    };
  case ActionTypes.MEDIAITEM_UPDATE_START:
    return {
      ...state,
      isUpdating: true
    };
  case ActionTypes.MEDIAITEM_UPDATE_SUCCESS:
    
    return {
      ...state,
      isUpdating: false
    };
  case ActionTypes.MEDIAITEM_UPDATE_FAILURE:
    return {
      ...state,
      isUpdating: false
    };
  case ActionTypes.USER_UPDATE_SUCCESS:
   
    return {
      ...state,
      isUpdating: false
    }
  case ActionTypes.FETCHING_UPDATED_SELFE_START:
    return {
      ...state,
      isFetching: true
    }
  case ActionTypes.FETCHING_UPDATED_SELFE_SUCCESS:
    return {
      ...state,
      currentUser: new User(action.user),
      isFetching: false
    }
  case ActionTypes.FETCHING_UPDATED_SELFE_FAILURE:
    return {
      ...state,
      isFetching: false
    }
  default:
    return state;
  }
}

export default Reducer;