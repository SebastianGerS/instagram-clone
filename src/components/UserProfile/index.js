import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import uuidv1 from "uuid";
import {SettingsModal} from '../';

const mapStateToProps = state => {
  return { currentUser: state.currentUser, isLogedin: state.isLogedin, user: state.user};
}

class ConnectedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.state = {
      user: undefined,
      isBeingEdited: false,
    }
  }
  componentWillMount( ) {
    if(this.props.path === '/profile' && this.props.isLogedin) {
      this.setState ({
        user: this.props.currentUser
      });
    } else {
      this.setState ({
        user: this.props.user
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.user !== prevProps.user || this.props.currentUser !== prevProps.currentUser || this.props.path !== prevProps.path) {
      if(this.props.path === '/profile' && this.props.isLogedin) {
        this.setState ({
          user: this.props.currentUser
        });
      } else {
        this.setState ({
          user: this.props.user
        });
      }
    }
  }
  toggleSettings() {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited
    })
  }
  render() {
    const content = [];
    if(this.state.user.username) {
    
      let settingButtons = [];
      let profileImage;
      if(this.state.user === this.props.currentUser) {
        settingButtons = [<button key={uuidv1()} onClick={this.toggleSettings} className="btn-settings">Edit Profile</button>,
        <button key={uuidv1()} className="btn-mobile-settings"></button>];
      }
      if (this.state.user.profilePicture.length !== 0) {
        profileImage = <img className="profile-img" src={this.state.user.profilePicture} alt="profileimg"/>;
      }
      const img =
          <figure key={uuidv1()}className="profile-img-container">
            {profileImage}
          </figure>;
      const profile = 
          <div key={uuidv1()} className="info">
            <div>
              <h3>{this.state.user.username}</h3>
              {settingButtons}
            </div>
            <div>
              <p><span className="bold">{this.state.user.mediaItems.length}</span> Posts</p>
              <p><span className="bold">{this.state.user.followedBy.length}</span> Followers</p>
              <p><span className="bold">{this.state.user.follows.length}</span> Following</p>
            </div>
            <div>
              <p className="bold">{this.state.user.full_name}</p>
            </div>
          </div>
      content.push(img,profile);

    }
      return (
        <section className="userProfile">
          {content}
          {this.state.isBeingEdited &&
            <SettingsModal user={this.state.user} toggleSettings={this.toggleSettings}/>
          }
        </section>
      );
  }
}
const UserProfile = connect(mapStateToProps)(ConnectedUserProfile);

export default UserProfile;