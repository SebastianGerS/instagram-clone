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
export const fetchMediaItems = () => dispatch => {
  dispatch(requestMediaItems());
  const url = GET_MEDIA_URL;
  fetch(url)
    .then(res => res.json())
    .then(res => {      
      let count = 0; // will be removed in production only here to limit requests to the instagram api
      res.data.forEach(item => {  
        let toBeAdded = true;
      
        if (count > 5) {
          toBeAdded = false;
        }

        if (toBeAdded) {
          const itemURL = `${GET_MEDIAITEM_URL}/${item.id}${ACCESS_TOKEN}`;
          dispatch(requestMediaItems());
          fetch(itemURL)
            .then(res => res.json())
            .then(mediaItem => {

              if (mediaItem.data.comments.count > 0) {
                const commentsURL = `${GET_MEDIAITEM_URL}/${item.id}/comments${ACCESS_TOKEN}`;
                dispatch(requestMediaItems());
                fetch(commentsURL)
                  .then(r => r.json())
                  .then(r => {
                    mediaItem.data.comments['data'] = r.data;
                    dispatch(reciveMediaItem(mediaItem.data));
                  });
              } else {
                dispatch(reciveMediaItem(mediaItem.data));
              }
            })
            .catch(e => {
              console.log(e);
            
            });
         
        }
        count++;
      }); 
    }).catch(error => {
      console.log(error);
      dispatch(rejectedMediaItems());
    });
};

export const fetchProfile = () => dispatch => {
  dispatch(requestUser());
  const url = GET_SELF_URL;
  fetch(url)
    .then(res => res.json())
    .then(user => {
      dispatch(reciveUser(user.data));
    }).catch(error => {
      console.log(error);
      dispatch(rejectedUser());
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
    })
}


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
    })

}