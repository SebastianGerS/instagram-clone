import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import InstagramActionTypes from './InstagramActionTypes';
import InstagramDispatcher from './InstagramDispatcher';

class InstagramStore extends ReduceStore {
  constructor() {
    super(InstagramDispatcher);
  }
  getInitialState() {
    return Immutable.OrderedMap();
  }
  reduce(state, action) {
    switch (action.type) {
      case InstagramActionTypes.AUTH_USER:
      
        return state;
        break;
    }
  }
}

export default new InstagramStore();