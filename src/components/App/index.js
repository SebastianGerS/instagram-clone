import React, { Component } from 'react';
import './styles.css';
import { Header, Footer } from '../';
import { Root } from '../../containers';
import {GET_MEDIA_URL, GET_SELF_URL} from '../../data/Instagram//URLs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
   
  }

  componentWillMount(){
    this.fetchProfile();
    this.fetchImages();
  }
  render() {

    const mediaItems = [];
    let user;

    this.props.inherited.data.forEach(data => {       
      if(data.mediaItem){
      mediaItems.push(data.mediaItem);
      } else if (data.user) {
        user = data.user;
      }
    });

    return (
      <div className="App">
        <Header />
          <div className="content">
            <Root mediaItems={mediaItems} user={user} />
          </div>
        <Footer/>
      </div>
    );
  }


  fetchImages() {
    const url = GET_MEDIA_URL;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        res.data.forEach(item => {
          this.props.inherited.onAddItem(item);
        });
      }).catch(error => {
        console.log(error);
      });
    }
  
  fetchProfile() {
    const url = GET_SELF_URL;
    fetch(url)
      .then(res => res.json())
      .then(user => {
        this.props.inherited.onSetUser(user.data);
      }).catch(error => {
        console.log(error);
      });
  }
}

export default App;
