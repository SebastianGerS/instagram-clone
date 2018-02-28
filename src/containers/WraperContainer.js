import { Wraper } from '../views';
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
    data: InstagramStore.getState(),
    onAddItem: InstagramActions.addItem,
    onSetUser: InstagramActions.setUser,
  };
}

export default Container.createFunctional(Wraper, getStore, getState);