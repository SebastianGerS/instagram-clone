import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return { currentUser: state.currentUser};
}

class ConnectedUserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const content = [];
    if(this.props.currentUser) {
      this.props.currentUser.forEach(user => {
        const img =
            <figure key={uuidv1()}className="profile-img-container">
              <img className="profile-img" src={user.profilePicture}/>
            </figure>;
        const profile = 
            <div key={uuidv1()} className="info">
              <div>
                <h3>{user.username}</h3>
                <button className="btn-settings">Redigera Profil</button>
                <button className="btn-mobile-settings"></button>
              </div>
              <div>
              <p><span className="bold">{user.mediaItems.length}</span> Inlägg</p>
              <p><span className="bold">{user.followedBy.length}</span> Följare</p>
              <p><span className="bold">{user.follows.length}</span> Följer</p>
              </div>
              <div>
                <p className="bold">{user.full_name}</p>
              </div>
            </div>
        content.push(img,profile);
      });
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