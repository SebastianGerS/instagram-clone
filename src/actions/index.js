import ActionTypes from './ActionTypes';
import {GET_SELF_URL,GET_MEDIA_URL, GET_MEDIAITEM_URL, ACCESS_TOKEN} from '../data/URLs';

export const addItem = item => ({
  type: ActionTypes.ADD_ITEM,
  item: item
});

export const setUser = user => ({ 
  type: ActionTypes.SET_USER,
  user: user
});
export const reciveMediaItem = mediaItem => ({
  type: ActionTypes.FETCH_MEDIAITEMS_SUCCESS,
  mediaItem: mediaItem
});
export const requestMediaItems = () => ({
  type: ActionTypes.FETCH_MEDIAITEMS_START
});

export const rejectedMediaItems = () => ({
  type: ActionTypes.FETCH_MEDIAITEMS_FAILURE
});

export const getMediaItems = (props) => ({
  type: ActionTypes.GET_MEDIA_ITEMS,
  mediaItems: props
});

export const requestUser = () => ({
  type: ActionTypes.FETCH_USER_START
});
export const reciveUser = user => ({
  type: ActionTypes.FETCH_USER_SUCCESS,
  user: user
});
export const rejectedUser = () => ({
  type: ActionTypes.FETCH_USER_FAILURE
});

export const requestUserRegistration = () => ({
  type: ActionTypes.USER_REGISTRATION_START
});
export const userRegistered = data => ({
  type: ActionTypes.USER_REGISTRATION_SUCCESS,
  data: data
});
export const rejectedUserRegistration = () => ({
  type: ActionTypes.USER_REGISTRATION_FAILURE
});

export const attemptLogin = () => ({
  type: ActionTypes.USER_LOGIN_START
});
export const userLogedin = data => ({
  type: ActionTypes.USER_LOGIN_SUCCESS,
  data: data
});
export const loginFailed = () => ({
  type: ActionTypes.USER_LOGIN_FAILURE
});
export const logoutUser = () => ({
  type: ActionTypes.USER_LOGOUT
});

export const fetchMediaItems = (token, existingItems) => dispatch => {
  dispatch(requestMediaItems());
  fetch('mediaItems/selfe', {
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(mediaItems => {  
      
      
      mediaItems.forEach(mediaItem => {  
        let toBeAdded = true;
        
        existingItems.forEach(existingItem => {
          if (mediaItem._id === existingItem.id) {
            toBeAdded = false;
          }
        });
        

        if (toBeAdded) {
          dispatch(reciveMediaItem(mediaItem));
        }
      }); 
    }).catch(error => {
      console.log(error);
      dispatch(rejectedMediaItems());
    });
};

export const registerUser = (user) => dispatch => {
  dispatch(requestUserRegistration());
  fetch('/auth/register', {
    method: 'POST', 
    body: JSON.stringify(user), 
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch(userRegistered(data));
    })
    .catch(error => {
      console.log(error);
      dispatch(rejectedUserRegistration());
    });
};


export const loginUser = (user) => dispatch => {
  dispatch(attemptLogin());
  fetch('/auth/login', {
    method: 'POST', 
    body: JSON.stringify(user), 
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }).then(res => res.json())
    .then(data => {
      dispatch(userLogedin(data));
    }).catch(error => {
      console.log(error);
      dispatch(loginFailed());
    });

};