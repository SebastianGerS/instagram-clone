import React, {Component} from 'react';
import {ItemGrid, ItemFeed} from '../containers';
import { UserProfile, Tab } from '../components';
import {connect} from 'react-redux';
import {addItem} from '../actions';
import {GET_MEDIA_URL, GET_MEDIAITEM_URL, ACCESS_TOKEN} from '../data/URLs';
import './Profile.css';

const mapDispatchToProps = dispatch => {
  return {
    AddItem: item => dispatch(addItem(item)) 
  };
};

const mapStateToProps = state => {
  return { mediaItems: state.mediaItems};
}

class ConnectedProfile extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: 0,
      tabs: { 0: 'active'},
    }

    this.changeTab = this.changeTab.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
  }

  componentWillMount(){
    this.fetchImages();
  }

  changeTab(index) {
    return this.setState({
      activeTab: index,
      tabs: {
        [`${index}`]: 'active'
      }
    });
  }

  render() {
    
    let content;

    if (this.state.activeTab === 0) {
      content = <ItemGrid mediaItems={this.props.mediaItems}/>;
    } else  if(this.state.activeTab === 1) {
      content = <ItemFeed mediaItems={this.props.mediaItems} />;
    }

    return (
      <div className="content">
        <UserProfile />
        <div className="tabs">
          <Tab index={0} name="Grid" changeTab={this.changeTab} active={this.state.tabs[0]}/>
          <Tab index={1} name="Flow" changeTab={this.changeTab} active={this.state.tabs[1]}/>
        </div>
        {content}
      </div>
    );
   }

  fetchImages() {
  const url = GET_MEDIA_URL;
  
  fetch(url)
    .then(res => res.json())
    .then(res => {      
      let count = 0; // will be removed in production only here to limit requests to the instagram api
      res.data.forEach(item => {  
        let toBeAdded = true;

        this.props.mediaItems.forEach(existingItem => {
          if(item.id === existingItem.id){
            console.log('will not be added');
           toBeAdded = false;
          }
        });

        if (count > 5) {
          console.log('will not be added');
           toBeAdded = false;
        }

        if (toBeAdded) {
          const itemURL = `${GET_MEDIAITEM_URL}/${item.id}${ACCESS_TOKEN}`
          console.log(itemURL);
          fetch(itemURL)
          .then(res => res.json())
          .then(mediaItem => {

            if (mediaItem.data.comments.count > 0) {
              const commentsURL = `${GET_MEDIAITEM_URL}/${item.id}/comments${ACCESS_TOKEN}`;
              fetch(commentsURL)
              .then(r => r.json())
              .then(r => {
              mediaItem.data.comments['data'] = r.data;
              this.props.AddItem(mediaItem.data);
              })
            } else {
              this.props.AddItem(mediaItem.data);
            }
          })
          .catch(e => {
            console.log(e);
            
          });
         
        }
        count++;
      }); 
    }).catch(error => {
      console.log(error);
    });
  }
}

const Profile = connect(mapStateToProps,mapDispatchToProps)(ConnectedProfile);

export default Profile;