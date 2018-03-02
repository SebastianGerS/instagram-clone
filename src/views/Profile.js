import React, {Component} from 'react';
import {ItemGrid, ItemFeed} from '../containers';
import { UserProfile, Tab } from '../components';
import {connect} from 'react-redux';
import {addItem} from '../actions';
import {GET_MEDIA_URL} from '../data/URLs';
import './Profile.css';

const mapDispatchToProps = dispatch => {
  return {
    onAddItem: item => dispatch(addItem(item)) 
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
      content = <ItemGrid />;
    } else  if(this.state.activeTab === 1) {
      content = <ItemFeed />;
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
      res.data.forEach(item => {  
        let toBeAdded = true;

        this.props.mediaItems.forEach(existingItem => {
          if(item.id === existingItem.id){
           toBeAdded = false;
          }
        });

        if (toBeAdded) {
          this.props.onAddItem(item);
        }

      }); 
    }).catch(error => {
      console.log(error);
    });
  }
}

const Profile = connect(mapStateToProps,mapDispatchToProps)(ConnectedProfile);

export default Profile;