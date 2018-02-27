import React, {Component} from 'react';
import {GET_MEDIA_URL, GET_SELF_URL} from '../data/Instagram//URLs';
import './ItemGrid.css';
import {UserProfile} from '../components';
class ItemGrid extends Component {
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
    const content = [];
    const userProfile = [];
    this.props.inherited.data.forEach(data => { 
      if( data.mediaItem){
        let img = <img key={data.mediaItem.images.low_resolution.url} src={data.mediaItem.images.low_resolution.url}/>;
      content.push(img);
      } else if (data.user) {
        let u = <UserProfile user={data.user} />
        userProfile.push(u);
      }
      
    });
   
    return (
      <section className='main'>
        {userProfile}
      <article className="imgGrid">
        {content}
      </article>
      </section>
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


export default ItemGrid;