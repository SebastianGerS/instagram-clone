import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Profile, Explore, ErrorPage, SignUp, SignIn } from '../views';

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/explore" component={Explore}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/signin" component={SignIn}/>
      <Route component={ErrorPage}/>
    </Switch>
  );
}

export default Root;