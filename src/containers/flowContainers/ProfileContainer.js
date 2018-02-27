import {Profile} from '../../views';
import { Container } from 'flux/utils';
import InstagramStore from '../../data/Instagram/InstagramStore';
import InstagramActions from '../../data/Instagram/InstagramActions';

function getStore() {
  return [
    InstagramStore
  ];
}

function getState() {
  return {
    items: InstagramStore.getState(),
    onAddItem: InstagramActions.addItem,
  };
}

export default Container.createFunctional(Profile, getStore, getState);