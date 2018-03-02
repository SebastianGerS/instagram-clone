import React, { Component } from 'react';
import './styles.css';
import { Header, Footer } from '../';
import { Root } from '../../containers';
import {GET_SELF_URL} from '../../data/URLs';
import {connect} from 'react-redux';
import {setUser} from '../../actions';
import { BrowserRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)) 
  };
};

class ConnectedApp extends Component {
  constructor() {
    super();
    this.state = {
      
    };
   
  }

  componentWillMount(){
    this.fetchProfile();
  }
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
            <div className="wraper">
              <Root />
            </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }

  fetchProfile() {
    const url = GET_SELF_URL;
    fetch(url)
      .then(res => res.json())
      .then(user => {
        
        this.props.setUser(user.data);
      }).catch(error => {
        console.log(error);
      });
  }
}
const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
