import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Profile, Explore, ErrorPage, SignUp, SignIn } from '../views';
import ProfileContainer from './flowContainers/ProfileContainer';
const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/profile" component={ProfileContainer}/>
      <Route exact path="/explore" component={Explore}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route component={ErrorPage}/>
    </Switch>
  );
}

export default Root;