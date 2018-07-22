import React, {Component} from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import { Home, Profile, Explore, ErrorPage, SignUp, ItemUpload } from '../views';
import {connect} from 'react-redux';
import CommonRoute from '../components/CommonRoute';

const mapStateToProps = state => {
  return { isLogedin: state.isLogedin};
}

class ConnectedRoot  extends Component {

  render() {
    return (
   
      this.props.isLogedin ?
      <BrowserRouter>
      <Switch>
        <CommonRoute exact={true} path="/home" component={Home}/>
        <CommonRoute exact={true} path="/profile" component={Profile}/>
        <CommonRoute exact={true} path="/explore" component={Explore}/>
        <CommonRoute exact={true} path="/upload" component={ItemUpload} />
        <CommonRoute exact={true} path="/" component={Explore}/>
        <CommonRoute exact={false} path="/users/:userId" component={Profile}/>
        <CommonRoute exact={true} path="/register" component={SignUp}/>
        <CommonRoute exact={false} path="" component={ErrorPage}/>
      </Switch>
      </BrowserRouter>
      : 
      <BrowserRouter>
      <Switch>
        <CommonRoute exact={true} path="/explore" component={Explore}/>
        <CommonRoute exact={true} path="/" component={Explore}/>
        <CommonRoute exact={false} path="/users/:userId" component={Profile}/>
        <CommonRoute exact={true} path="/register" component={SignUp}/>
        <CommonRoute exact={false} path="" component={ErrorPage}/>
      </Switch>
      </BrowserRouter>
      
    )
  }

}

const Root = connect(mapStateToProps)(ConnectedRoot);

export default Root;