import ActionTypes from './ActionTypes';

export const addItem = item => ({
  type: ActionTypes.ADD_ITEM,
  item: item
});

export const setUser = user => ({ 
  type: ActionTypes.SET_USER,
  user: user
});
export const reciveMediaItem = mediaItems => ({
  type: ActionTypes.FETCH_MEDIAITEMS_SUCCESS,
  mediaItems: mediaItems
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

export const startUpdatingMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_UPDATE_START,

});
export const updatedMediaItem = (mediaItemId, updatedFields) => ({
  type: ActionTypes.MEDIAITEM_UPDATE_SUCCESS,
  mediaItemId: mediaItemId,
  updatedFields: updatedFields
});
export const updateMediaItemFailed = () => ({
  type: ActionTypes.MEDIAITEM_UPDATE_FAILURE,
});
export const updatedCurrentUser = (updatedFields) => ({
  type: ActionTypes.USER_UPDATE_SUCCESS,
  updatedFields: updatedFields
});

export const fetchMediaItems = (token) => dispatch => {
  dispatch(requestMediaItems());
  fetch('mediaItems/selfe', {
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res => res.json())
    .then(mediaItems => dispatch(reciveMediaItem(mediaItems)))
    .catch(error => {
      console.log(error);
      dispatch(rejectedMediaItems());
    });
};

export const fetchAllMediaItems = (token) => dispatch => {
  dispatch(requestMediaItems());
  fetch('mediaItems/', {
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res => {
      if (res.status !== 200) {
        return {error: res.json};
      }
      return res.json();
    })
    .then(mediaItems => {
      if (mediaItems.error){
        mediaItems = [];
      }
      dispatch(reciveMediaItem(mediaItems));
    })
    .catch(error => {
      console.log(error);
      dispatch(rejectedMediaItems());
    });
};
export const fetchMediaItemsOfFollowed = (token) => dispatch => {
  dispatch(requestMediaItems());
  fetch('mediaItems/follows', {
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res =>  {
      if (res.status !== 200) {
        return {error: res.json};
      }
      return res.json();
    })
    .then(mediaItems =>  {
      if (mediaItems.error) {
        mediaItems = [];
      }
      dispatch(reciveMediaItem(mediaItems));
    })
    .catch(error => {
      console.log(error);
      dispatch(rejectedMediaItems());
    });
};
export const fetchUser = (userId) => dispatch => {
  dispatch(requestUser());
  fetch(`/users/${userId}`, {
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res =>  {
      if (res.status !== 200) {
        return {error: res.json};
      }
      return res.json();
    })
    .then(user =>  {
      if (user.error) {
        user = [];
      }
      dispatch(reciveUser(user));
    })
    .catch(error => {
      console.log(error);
      dispatch(rejectedUser());
    });
}; 
export const fetchUserMediaItems = (userId) => dispatch => {
  dispatch(requestMediaItems());
  fetch(`/mediaItems/${userId}`, {
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(res =>  {
      if (res.status !== 200) {
        return {error: res.json};
      }
      return res.json();
    })
    .then(mediaItems =>  {
      if (mediaItems.error) {
        mediaItems = [];
      }
      dispatch(reciveMediaItem(mediaItems));
    })
    .catch(error => {
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

export const toggleLike = (mediaItemId, token, updatedFields) => dispatch => {
  dispatch(startUpdatingMediaItem());
  fetch('/mediaitems/' + mediaItemId, {
    method: 'PUT', 
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }})
    .then(res => res.json())
    .then(res => {
      dispatch(updatedMediaItem(mediaItemId, updatedFields));
    })
    .catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};

export const createComment = (comment,mediaItemId ,token, updatedFields) => dispatch => {
  fetch(`/mediaitems/${mediaItemId}/comments`,
    {
      method: 'POST', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ text: comment, _id: updatedFields[0].value._id})
    })
    .then(res => res.json())
    .then(res => {
      dispatch(updatedMediaItem(mediaItemId, updatedFields));
    }).catch(error => {
      console.log(error);
    });
};

export const deleteComment = (mediaItemId, commentId, token, updatedFields) => dispatch => {
  fetch(`/mediaitems/${mediaItemId}/comments/${commentId}`,
    {
      method: 'DELETE', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      dispatch(updatedMediaItem(mediaItemId, updatedFields));
    }).catch(error => {
      console.log(error);
    });
};

export const updateComment = (mediaItemId, commentId, token, updatedFields) => dispatch => {
  
  fetch(`/mediaitems/${mediaItemId}/comments/${commentId}`,
    {
      method: 'PUT', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(updatedFields[0])
    })
    .then(res => res.json())
    .then(res => {
      dispatch(updatedMediaItem(mediaItemId, updatedFields));
    }).catch(error => {
      console.log(error);
    });
};

export const toggleFollow = (token, updatedFields) => dispatch => {
  fetch(`/users/${updatedFields[0].value}`,
    {
      method: 'PUT', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(updatedFields[0])
    })
    .then(res => res.json())
    .then(res => {
      dispatch(updatedCurrentUser(updatedFields));
    }).catch(error => {
      console.log(error);
    });
};

export const uploadItem = (item, token) => dispatch => {
  console.log(item.get('data'));
  fetch(`/mediaItems/`,
    {
      method: 'POST', 
      headers: {
        'x-access-token': token,
      },
      body: item
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    
    }).catch(error => {
      console.log(error);
    });
};