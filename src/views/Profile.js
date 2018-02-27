import React, {Component} from 'react';
import {ItemGrid} from '../containers';

const Profile = (props) => {
   
    return (
      <div>
        <h2>Profile page</h2> 
        <ItemGrid inherited={props} />
      </div>
    );
 
}

export default Profile;