import React, {Component} from 'react';
import {ItemGrid} from '../containers';
import './Profile.css';

const Profile = (props) => {
   
    return (
      <div>
        <h2>Profile page</h2> 
        <ItemGrid inherited={props.inherited} />
      </div>
    );
 
}

export default Profile;