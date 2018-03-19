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
export const startCreatingMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_CREATE_START,
});

export const createdMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_CREATE_SUCCESS,
});

export const createMediaItemFailed = () => ({
  type: ActionTypes.MEDIAITEM_CREATE_FAILURE,
});

export const startDeletingMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_DELETE_START,
});

export const deletedMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_DELETE_SUCCESS,
});

export const deleteMediaItemFailed = () => ({
  type: ActionTypes.MEDIAITEM_DELETE_FAILURE,
});

export const startUpdatingMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_UPDATE_START,
});

export const updatedMediaItem = () => ({
  type: ActionTypes.MEDIAITEM_UPDATE_SUCCESS,
});

export const updateMediaItemFailed = () => ({
  type: ActionTypes.MEDIAITEM_UPDATE_FAILURE,
});

export const startUpdatingCurrentUser = () => ({
  type: ActionTypes.USER_UPDATE_START,
});

export const updatedCurrentUser = () => ({
  type: ActionTypes.USER_UPDATE_SUCCESS,
});

export const failedToUpdateCurrentUser = () => ({
  type: ActionTypes.USER_UPDATE_FAILURE,
});

export const startFetchingUpdatedSelfe = () => ({
  type: ActionTypes.FETCHING_UPDATED_SELFE_START
});

export const updatedSelfeFetched = (user) => ({
  type: ActionTypes.FETCHING_UPDATED_SELFE_SUCCESS,
  user: user
});

export const failedFetchingSelfe = () => ({
  type: ActionTypes.FETCHING_UPDATED_SELFE_FAILURE
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
  let url;
  if (token) {
    url = 'mediaItems/';
  } else {
    url = 'mediaItems/all';
  }
  
  dispatch(requestMediaItems());
  fetch(url, {
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
export const fetchSelfe = (token) => dispatch => {
  dispatch(startFetchingUpdatedSelfe());
  fetch('/auth/me', {
    headers: {
      'x-access-token': token,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }).then(res => res.json())
    .then(user => {
      console.log(user);
      dispatch(updatedSelfeFetched(user));
    }).catch(error => {
      console.log(error);
      dispatch(failedFetchingSelfe());
    });
};
export const toggleLike = (mediaItemId, token, updatedFields, path, mediaItemUserId) => dispatch => {
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
      switch (path) {
      case '/':
        dispatch(fetchMediaItemsOfFollowed(token));
        break;
      case '/explore':
        dispatch(fetchAllMediaItems(token));
        break;
      case '/profile':
        dispatch(fetchMediaItems(token));
        break;
      default:
        dispatch(fetchUserMediaItems(mediaItemUserId));
        break;
      }
      dispatch(updatedMediaItem());
    })
    .catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};

export const createComment = (comment, mediaItemId ,token, path, mediaItemUserId) => dispatch => {
  dispatch(startUpdatingMediaItem());
  fetch(`/mediaitems/${mediaItemId}/comments`,
    {
      method: 'POST', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ text: comment })
    })
    .then(res => res.json())
    .then(res => {
      switch (path) {
      case '/':
        dispatch(fetchMediaItemsOfFollowed(token));
        break;
      case '/explore':
        dispatch(fetchAllMediaItems(token));
        break;
      case '/profile':
        dispatch(fetchMediaItems(token));
        break;
      default:
        dispatch(fetchUserMediaItems(mediaItemUserId));
        break;
      }
      dispatch(updatedMediaItem());
    }).catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};

export const deleteComment = (mediaItemId, commentId, token, path, mediaItemUserId) => dispatch => {
  dispatch(startUpdatingMediaItem());
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
      switch (path) {
      case '/':
        dispatch(fetchMediaItemsOfFollowed(token));
        break;
      case '/explore':
        dispatch(fetchAllMediaItems(token));
        break;
      case '/profile':
        dispatch(fetchMediaItems(token));
        break;
      default:
        dispatch(fetchUserMediaItems(mediaItemUserId));
        break;
      }
      dispatch(updatedMediaItem());
    }).catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};

export const updateComment = (mediaItemId, commentId, token, text, path, mediaItemUserId) => dispatch => {
  dispatch(startUpdatingMediaItem());
  fetch(`/mediaitems/${mediaItemId}/comments/${commentId}`,
    {
      method: 'PUT', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({text: text})
    })
    .then(res => res.json())
    .then(res => {
      switch (path) {
      case '/':
        dispatch(fetchMediaItemsOfFollowed(token));
        break;
      case '/explore':
        dispatch(fetchAllMediaItems(token));
        break;
      case '/profile':
        dispatch(fetchMediaItems(token));
        break;
      default:
        dispatch(fetchUserMediaItems(mediaItemUserId));
        break;
      }
      dispatch(updatedMediaItem());
    }).catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};

export const toggleFollow = (token, path, mediaItemUserId) => dispatch => {
  dispatch(startUpdatingCurrentUser());
  fetch(`/users/${mediaItemUserId}`,
    {
      method: 'PUT', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      switch (path) {
      case '/':
        dispatch(fetchMediaItemsOfFollowed(token));
        break;
      case '/explore':
        dispatch(fetchAllMediaItems(token));
        break;
      case '/profile':
        dispatch(fetchMediaItems(token));
        break;
      default:
        dispatch(fetchUserMediaItems(mediaItemUserId));
        break;
      }
      dispatch(updatedCurrentUser());
      dispatch(fetchSelfe(token));
    }).catch(error => {
      console.log(error);
      dispatch(failedToUpdateCurrentUser());
    });
};

export const uploadItem = (item, token) => dispatch => {
  dispatch(startCreatingMediaItem());
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
      dispatch(createdMediaItem());
      dispatch(fetchMediaItems(token)); 
      dispatch(fetchSelfe(token));
    }).catch(error => {
      dispatch(createMediaItemFailed());
      console.log(error);
    });
};

export const deleteMediaItem = (mediaItemId, mediaItemPath ,token) => dispatch => {
  dispatch(startDeletingMediaItem());
  fetch(`/mediaitems/${mediaItemId}`,
    {
      method: 'DELETE', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({path: mediaItemPath})
    })
    .then(res => res.json())
    .then(res => {
      dispatch(deletedMediaItem());
      dispatch(fetchMediaItems(token));
      dispatch(fetchSelfe(token));
    }).catch(error => {
      dispatch(deleteMediaItemFailed());
      console.log(error);
    });
};

export const updateMediaItem = (mediaItemId, token, fields) => dispatch => {
  dispatch(startUpdatingMediaItem());
  fetch(`/mediaitems/${mediaItemId}`,
    {
      method: 'PUT', 
      headers: {
        'x-access-token': token,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(fields)
    })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchMediaItems(token));
    }).catch(error => {
      console.log(error);
      dispatch(updateMediaItemFailed());
    });
};
export const updateUserInfo = (token, data) => dispatch => {
  dispatch(startCreatingMediaItem());
  fetch(`/auth/me`,
    {
      method: 'POST', 
      headers: {
        'x-access-token': token,
      },
      body: data
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      // dispatch(createdMediaItem());
      dispatch(fetchMediaItems(token)); 
      dispatch(fetchSelfe(token));
    }).catch(error => {
      // dispatch(createMediaItemFailed());
      console.log(error);
    });
}