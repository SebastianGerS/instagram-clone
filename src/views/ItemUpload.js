import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import uuidv1 from "uuid";
import {connect} from 'react-redux';
import {uploadItem} from '../actions';
import './ItemUpload.css';
import {Redirect} from 'react-router';
const mapStateToProps = state => {
  return { token: state.token};
}

class ConnectedItemUpload extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addTags = this.addTags.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.state = {
      fileToUpload: undefined,
      caption: '',
      location: '',
      tag: '',
      tags: [],
      redirect: false
    };
  }
  componentDidUpdate() {

  }
  onDrop(file){
    this.setState({
      fileToUpload: file[0]
    });
  }
  uploadImage() {
    if(!this.state.fileToUpload) {
      console.log('please select a file');
      return;
    }
    const item = new FormData();
    item.append('caption', this.state.caption);
    item.append('location', this.state.location);
    item.append('tags', this.state.tags);
    item.append('data', this.state.fileToUpload);
     
    this.props.dispatch(uploadItem(item, this.props.token.value));
    window.URL.revokeObjectURL(this.state.fileToUpload.preview);
    this.setState({
      redirect: true
    });
  }
  addTags (e) {
    e.preventDefault;

    if(e.key === ' ' || e.key === 'Enter') {
      let newTag = this.state.tag;
      newTag = newTag.trim();
      newTag = newTag.charAt(0) !== '#' ? `#${newTag}` : newTag;
      this.setState({
        tags: [
          ...this.state.tags,
          newTag
        ],
        tag: ''
      });
    } 
  }
  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
    }
  removeTag(e) {
    const tags = this.state.tags;
    tags.splice(e.target.value, 1);

    this.setState({
      tags: [
        ...tags
      ]
    });
  }
  render() {
    let imagePreview;
    let info;
    const tags = [];
    if( this.state.redirect === true) {
      return <Redirect to="/profile" />;
    }
    if(this.state.fileToUpload) {
      imagePreview = {
        backgroundImage: `url(${this.state.fileToUpload.preview})`,
        height: 'auto',
        width: '300px'
      }
      info = '';
    } else {
      info = 'Here you will soon beable to upload your images'
    }
    let i = 0
    this.state.tags.map(tag => {
      let li = <li key={uuidv1()}>{tag} <button value={i} onClick={this.removeTag}></button></li>;
      tags.push(li);
      i++
    });

    return (
      <div className="imageUpload">
        <div className="imageInfo">
        <h3>Caption: <span>{this.state.caption}</span></h3>
        <h3>Location: <span>{this.state.location}</span></h3>
        <ul>
          <h3>Tags: </h3>
          {tags}
        </ul>
        </div>
        <Dropzone style={imagePreview}
        multiple={false}
        accept="image/*"
        onDrop={this.onDrop}
        className="dropzone">
        <p>{info}</p>
        </Dropzone>
        <div className="imageForm">
          <label htmlFor="caption" >Caption</label>
          <input name="caption" onChange={this.updateStateValue} value={this.state.caption}/>
          <label htmlFor="location" >Location</label>
          <input name="location" onChange={this.updateStateValue} value={this.state.location}/>
          <label htmlFor="tag" >Tags</label>
          <input name="tag" onKeyPress={this.addTags} onChange={this.updateStateValue} value={this.state.tag}/>
          <button  onClick={this.uploadImage}>Upload!</button>
        </div>
      </div>
    );
  }
}
const ItemUpload = connect(mapStateToProps)(ConnectedItemUpload);
export default ItemUpload;