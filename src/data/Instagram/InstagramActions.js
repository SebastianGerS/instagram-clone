import InstagramActionTypes from './InstagramActionTypes';
import InstagramDispatcher from './InstagramDispatcher';

const Actions = {
  authUser() {
    InstagramDispatcher.dispatch({
      type: InstagramActionTypes.AUTH_USER,
      
    });
  },
  addItem(item) {
    InstagramDispatcher.dispatch({
      type: InstagramActionTypes.ADD_ITEM,
      item
    });
  },
}

export default Actions;