import React, {Component} from 'react';
import {ItemGrid} from '../containers';
import { UserProfile } from '../components';
import './Profile.css';
const Profile = (props) => {
   
    return (
      <div>
        <h2>Profile page</h2> 
        <UserProfile user={props.user} />
        <ItemGrid mediaItems={props.mediaItems} />
      </div>
    );
 
}

export default Profile;