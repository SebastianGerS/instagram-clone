import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateUserInfo} from '../../actions';
import './style.css';

const mapStateToProps = state => {
  return {token: state.token};
}

class ConnectedSettingsModal extends Component {
  constructor(props) {
    super(props);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      email: this.props.user.email,
      username: this.props.user.username,
      fullname: this.props.user.fullname,
      fileToUpload: undefined,
    }
  }
 
  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
  };

  updateUserInfo(e) {
    e.preventDefault();
    const data = new FormData();
    if(this.state.fileToUpload) {
      data.append('profilePicture', this.state.fileToUpload);
    }
    if(this.state.username !== this.props.user.username) {
      data.append('username', this.state.username);
    }
    if(this.state.email !== this.props.user.email) {
      data.append('email', this.state.email);
    }
    if(this.state.fullname !== this.props.user.fullname) {
      data.append('fullname', this.state.fullname);
    }

    this.props.dispatch(updateUserInfo(this.props.token.value, data));
    this.closeModal();
  };

  onDrop(file){
    this.setState({
      fileToUpload: file[0]
    });
  };

  closeModal() {
    this.props.toggleSettings();
  }

  render() {
    let imagePreview;
   
    if(this.state.fileToUpload) {
      imagePreview = {
        backgroundImage: `url(${this.state.fileToUpload.preview})`,
      };
    } else {
      imagePreview = {
        backgroundImage: `url(${this.props.user.profilePicture})`,
      };
    }

    return (
      <section className="settingsModal">
       <Dropzone style={imagePreview}
        multiple={false}
        accept="image/*"
        onDrop={this.onDrop}
        className="changeProfileImage">
        </Dropzone>
        <form onSubmit={this.updateUserInfo}>
          <label htmlFor="username" >Username</label>
          <input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.updateStateValue}/>
          <label htmlFor="fullname" >Fullname</label>
          <input name="fullname" type="text" placeholder="Fullname" value={this.state.fullname} onChange={this.updateStateValue}/>
          <label htmlFor="email" >Email</label>
          <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.updateStateValue}/>
          <div>
            <button className="warning" type="cancel" onClick={this.closeModal}>Cancel</button>
            <button className="success" type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}
const SettingsModal = connect(mapStateToProps)(ConnectedSettingsModal);
export default SettingsModal;