import {Home} from '../views';
import { Container } from 'flux/utils';
import InstagramStore from '../data/Instagram/InstagramStore';
import InstagramActions from '../data/Instagram/InstagramActions';

function getStore() {
  return [
    InstagramStore
  ];
}

function getState() {
  return {
    onAuthUser: InstagramActions.authUser,
  };
}

export default Container.createFunctional(Home, getStore, getState);