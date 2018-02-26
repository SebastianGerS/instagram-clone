import InstagramActionTypes from './InstagramActionTypes';
import InstagramDispatcher from './InstagramDispatcher';

const Actions = {
  authUser() {
    InstagramDispatcher.dispatch({
      type: InstagramActionTypes.AUTH_USER,
      
    });
  },
}

export default Actions;