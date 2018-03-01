import React, {Component} from 'react';
import {ItemGrid} from '../containers';
import { UserProfile } from '../components';
import './Profile.css';
const Profile = () => {
   
    return (
      <div>
        <h2>Profile page</h2> 
        <UserProfile />
        <ItemGrid  />
      </div>
    );
 
}

export default Profile;