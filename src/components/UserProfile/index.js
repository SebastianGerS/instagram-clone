import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return { currentUser: state.currentUser, isLogedin: state.isLogedin, user: state.user};
}

class ConnectedUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
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

  render() {
    const content = [];
    if(this.state.user.username) {
    
      let settingButtons = [];
        if(this.state.user === this.props.currentUser) {
          settingButtons = [<button className="btn-settings">Redigera Profil</button>,
          <button className="btn-mobile-settings"></button>];
        }
        const img =
            <figure key={uuidv1()}className="profile-img-container">
              <img className="profile-img" src={this.state.user.profilePicture} alt="profileimg"/>
            </figure>;
        const profile = 
            <div key={uuidv1()} className="info">
              <div>
                <h3>{this.state.user.username}</h3>
                {settingButtons}
              </div>
              <div>
              <p><span className="bold">{this.state.user.mediaItems.length}</span> Inlägg</p>
              <p><span className="bold">{this.state.user.followedBy.length}</span> Följare</p>
              <p><span className="bold">{this.state.user.follows.length}</span> Följer</p>
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
        </section>
        );
  
  }
}
const UserProfile = connect(mapStateToProps)(ConnectedUserProfile);

export default UserProfile;