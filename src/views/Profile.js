import React, {Component} from 'react';
import {ItemGrid, ItemFeed} from '../containers';
import { UserProfile, Tab } from '../components';
import {connect} from 'react-redux';
import {addItem, fetchMediaItems} from '../actions';
import {GET_MEDIA_URL, GET_MEDIAITEM_URL, ACCESS_TOKEN} from '../data/URLs';
import './Profile.css';

const mapStateToProps = state => {
  return { mediaItems: state.mediaItems, token: state.token, isLogedin: state.isLogedin};
}

class ConnectedProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: { 0: 'active'},
    }

    this.changeTab = this.changeTab.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchMediaItems(this.props.token.value, this.props.mediaItems)); 
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
    if (this.props.isLogedin) {
      if (this.state.activeTab === 0) {
        content = <ItemGrid mediaItems={this.props.mediaItems}/>;
      } else  if(this.state.activeTab === 1) {
        content = <ItemFeed mediaItems={this.props.mediaItems} />;
      }
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
}

const Profile = connect(mapStateToProps)(ConnectedProfile);

export default Profile;