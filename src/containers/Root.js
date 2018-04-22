import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Profile, Explore, ErrorPage, SignUp, ItemUpload } from '../views';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return { isLogedin: state.isLogedin};
}

class ConnectedRoot  extends Component {

  render() {
    return (
      this.props.isLogedin ?
      <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/upload" component={ItemUpload} />
        <Route exact path="/" component={Explore}/>
        <Route path="/users/:userId" component={Profile}/>
        <Route exact path="/register" component={SignUp}/>
        <Route component={ErrorPage}/>
      </Switch>
      : 
      <Switch>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/" component={Explore}/>
        <Route path="/users/:userId" component={Profile}/>
        <Route exact path="/register" component={SignUp}/>
        <Route component={ErrorPage}/>
      </Switch>
    )
  }

}

const Root = connect(mapStateToProps)(ConnectedRoot);

export default Root;