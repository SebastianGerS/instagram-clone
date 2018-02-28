import React, {Component} from 'react';
import './style.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
   
    if (this.props.user) {
      return (
        <section className="userProfile">
          <figure className="profile-img-container">
            <img className="profile-img" src={this.props.user.profile_picture}/>
          </figure>
          <div className="info">
            <div>
              <h3>{this.props.user.username}</h3>
              <button className="btn-settings">Redigera Profil</button>
              <button className="btn-mobile-settings"></button>
            </div>
            <div>
            <p><span>{this.props.user.counts.media}</span> Inlägg</p>
            <p><span>{this.props.user.counts.followed_by}</span> Följare</p>
            <p><span>{this.props.user.counts.follows}</span> Följer</p>
            </div>
            <div>
              <p className="name">{this.props.user.full_name}</p>
            </div>
          </div>
        </section>
      );
    } else {
      return <section className="userProfile"></section>;
    }
  }
}

export default UserProfile;