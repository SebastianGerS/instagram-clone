import React, { Component } from 'react';
import './style.css';
import {ItemComment} from '../';
import uuidv1 from "uuid";
import {toggleLike, createComment, toggleFollow, deleteMediaItem, updateMediaItem} from '../../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    token:  state.token,
    currentUser: state.currentUser,
    isLogedin: state.isLogedin
  };
};

class ConnectedMediaItem extends Component {

  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.addComment = this.addComment.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.updateMediaItem = this.updateMediaItem.bind(this);
    this.removeMediaItem = this.removeMediaItem.bind(this);
    this.toggleMediaItemModal = this.toggleMediaItemModal.bind(this);
    this.state = {
      updatedFields: [],
      comment: '',
      isFollowing: false,
      caption: this.props.mediaItem.caption,
      location: this.props.mediaItem.location,
      tag: '',
      tags: [...this.props.mediaItem.tags.map(tag => {
              return tag.tagname})
            ],
      isBeingEdited: false,
      modal: [],
    }
  }
  componentWillMount(){
    if(this.props.mediaItem) {
      if(this.props.isLogedin) {
        if(this.props.currentUser.follows.includes(this.props.mediaItem.user._id)) {
          this.setState({
            isFollowing: true
          });
        } else {
          this.setState({
            isFollowing: false
          });
        }
      }
    } 
  }

  handleLike(e) {
    e.preventDefault();
    const field = [{
      name: 'likes',
      value: this.props.currentUser._id
    }];
    
    this.props.dispatch(toggleLike(this.props.mediaItem._id, this.props.token.value, field, this.props.path, this.props.mediaItem.user._id));
  }

  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
  }

  addComment(e) {
    e.preventDefault();
    this.props.dispatch(createComment(this.state.comment, this.props.mediaItem._id, this.props.token.value,this.props.path, this.props.mediaItem.user._id));
  }

  toggleFollow() {
    this.setState({
      isFollowing: !this.state.isFollowing
    })
    this.props.dispatch(toggleFollow(this.props.token.value, this.props.path, this.props.mediaItem.user._id));
  }

  updateMediaItem() {
    const fields = 
      {
        caption: this.state.caption,
        location: this.state.location,
        tags: this.state.tags
      };

    this.props.dispatch(updateMediaItem(this.props.mediaItem._id, this.props.token.value, fields));
    this.toggleMediaItemModal();
  }

  toggleMediaItemModal() {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited,
    });
  };


  removeMediaItem() {
    this.props.dispatch(deleteMediaItem(this.props.mediaItem._id, this.props.mediaItem.images.url, this.props.token.value));
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

  addTag (e) {
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

  render() {
    const comments = []
    const tags = [];
    let likeButtonClass;
    const OwnerActions = [];
    let button;
    const tagsBeingEdited = [];
    let userLink;
    if (!this.props.mediaItem) {
      return null;
    }
    if (this.props.mediaItem.comments) {
      this.props.mediaItem.comments.forEach(comment => {
        const newComment = <ItemComment path={this.props.path} key={uuidv1()} mediaItem={this.props.mediaItem} comment={comment}/>;
        comments.push(newComment);
      });
    }

    if (this.props.mediaItem.tags) {
      this.props.mediaItem.tags.forEach(tag => {
        let newTag = <span className="bold" key={uuidv1()}>&nbsp;{tag.tagname}</span>
        tags.push(newTag);
        return tag;
      });
    }
    if (this.state.tags) {
      let i = 0;
      this.state.tags.map(tagname => {
        let tag =  <li key={uuidv1()}>{tagname} <button value={i} onClick={this.removeTag}></button></li>
        tagsBeingEdited.push(tag);
        i++;
        return tagname;
      });
    }
   
    if (this.props.mediaItem.likes) {   
      if(this.props.mediaItem.likes.includes(this.props.currentUser._id)) {
          likeButtonClass = "likeButton liked";
      } else {
          likeButtonClass = "likeButton";
      }
    }

    if (this.props.isLogedin) {
      if (this.props.mediaItem.user._id !== this.props.currentUser._id) {
        if (this.state.isFollowing) {
          button = <button key={uuidv1()} className="unFollowButton" onClick={this.toggleFollow}></button>;
        } else {
          button = <button key={uuidv1()} className="followButton" onClick={this.toggleFollow}></button>;
        }     
        OwnerActions.push(button);
      } else if (this.props.mediaItem.user._id === this.props.currentUser._id) {
        button = <button key={uuidv1()} className="optionsButton" onClick={this.toggleMediaItemModal}></button>
        OwnerActions.push(button);
        button = <button key={uuidv1()} className="removeButton" onClick={this.removeMediaItem}></button>;
        OwnerActions.push(button);
      }
    }

    if(this.props.mediaItem.user._id !== this.props.currentUser._id){
      userLink = `/users/${this.props.mediaItem.user._id}`;
    } else {
      userLink = `/profile`;
    }
  
    return(
      <section className="mediaItem">
        <div className="profileBanner">
          <Link className="userLink" to={userLink}>
            <div>
              <img src={this.props.mediaItem.user.profilePicture} alt="profileimage"/>
              <div>
                <p className="bold">{this.props.mediaItem.user.username}</p>
                <p>{this.props.mediaItem.location}</p>
              </div>
            </div>
          </Link>
          <div>
          {OwnerActions}
          {this.state.isBeingEdited &&
            <section className="editMediaItemModal">
              <h3>Edit MediaItem</h3>
              <div>
                <div className="imageInfo">
                  <h3>Caption: <span>{this.state.caption}</span></h3>
                  <h3>Location: <span>{this.state.location}</span></h3>
                  <ul>
                    <h3>Tags: </h3>
                    {tagsBeingEdited}
                  </ul>
                </div>
                <div className="updateImageForm">
                  <label htmlFor="caption">Caption</label>
                  <input name="caption" onChange={this.updateStateValue} value={this.state.caption}/>
                  <label htmlFor="location">Location</label>
                  <input name="location" onChange={this.updateStateValue} value={this.state.location}/>
                  <label htmlFor="tag">Tags</label>
                  <input name="tag" onKeyPress={this.addTag} onChange={this.updateStateValue} value={this.state.tag}/>
                  <button className="warning" type="cancel" onClick={this.toggleMediaItemModal}>Cancel</button>
                  <button className="success" onClick={this.updateMediaItem}>Update!</button>
                </div>
              </div>
            </section>
          }
          </div>
        </div>
        <figure className="imgContainer">
          <img className="img" src={this.props.mediaItem.images.url} alt={this.props.mediaItem.caption}/>
        </figure>
        <div className="itemInfo">
          <div>
          {this.props.isLogedin &&
            <div className="imgButtons">
                <svg className={likeButtonClass} onClick={this.handleLike} enableBackground="new 0 0 24 24" viewBox="0 0 24 24" width="24px" >
                <path d="M7,22L7,22c-0.5,0-0.8-0.3-0.8-1c0.5-3.7-0.9-5.1-2.6-6.6c-1.4-1.3-2.9-2.8-3.1-5.8C0.4,6.9,1,5.2,2.2,4    
                C3.3,2.7,5,2,6.7,2c0,0,0.1,0,0.1,0c2.3,0,4.4,1.3,5.5,3.4c1.2-1.6,3-2.6,5-2.6l0.2,0c1.7,0.1,3.2,0.8,4.3,2   
                c1.2,1.3,1.8,2.9,1.7,4.7l0,0.1c-0.1,4.8-5.6,9.1-15.9,12.3C7.3,22,7.2,22,7,22z M7,21l0,0.5L7,21C7,21,7,21,7,21z M6.8,3   
                  C5.3,3,3.9,3.6,2.9,4.7c-1,1.1-1.5,2.4-1.4,3.9c0.2,2.6,1.4,3.9,2.8,5.2C6,15.3,7.7,17,7.2,21c0,0,0,0,0.1,0    
                  c9.8-3,15.2-7.1,15.2-11.4l0-0.2c0.1-1.5-0.4-2.9-1.4-4c-0.9-1-2.2-1.6-3.6-1.7l-0.2,0c-1.8,0-3.4,0.9-4.4,2.5c0,0,0,0,0,0.1   
                  c-0.1,0.2-0.3,0.4-0.6,0.4l0,0c-0.3,0-0.6-0.2-0.7-0.5C10.7,4.3,8.8,3,6.8,3z"/>
                </svg> 
            </div>
          }  
          <p className="bold">{this.props.mediaItem.likes.length} gilla-markeringar</p>
          <p className="caption"><span className="bold">{this.props.mediaItem.user.username}</span>&nbsp;{this.props.mediaItem.caption}&nbsp;{tags}</p>
          </div>
          <div>
          {comments}
          </div>
          <form className="commentForm" onSubmit={(e) => this.addComment(e)}>
            <textarea name="comment" placeholder="kommentera..." value={this.state.comment} onChange={(e) => this.updateStateValue(e)}/>
            <button type="submit" className="submitButton">Publish</button>
          </form>
        </div>
      </section>
    );
  }
}
const MediaItem = connect(mapStateToProps)(ConnectedMediaItem);

export default MediaItem;