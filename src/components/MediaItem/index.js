import React, { Component } from 'react';
import './style.css';
import uuidv1 from "uuid";
import {toggleLike} from '../../actions';
import {connect} from 'react-redux';
import heart from './heart.svg'
const mapStateToProps = state => {
  return {
    token:  state.token,
    currentUserId: state.currentUserId
  };
};

class ConnectedMediaItem extends Component {

  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.state = {
      updatedFields: []
    }
  }
  handleLike(e) {
    e.preventDefault();
    const field = [{
      name: 'likes',
      value: this.props.currentUserId
    }];

    this.props.dispatch(toggleLike(e.target.value, this.props.token.value, field));
  }
  render() {
    const comments = []
    const tags = [];
    let likeButtonClass;
    if (this.props.mediaItem.comments) {
      this.props.mediaItem.comments.forEach(comment => {
        let newComment = <p key={uuidv1()}><span className="bold">{comment.user.username}</span> {comment.text}</p>
        comments.push(newComment);
      });
    }

    if (this.props.mediaItem.tags) {
      this.props.mediaItem.tags.forEach(tag => {
        let newTag = <span key={uuidv1()}>{tag.text}</span>
        tags.push(newTag);
      });
    }
    if (this.props.mediaItem.likes) {
        
     if(this.props.mediaItem.likes.includes(this.props.currentUserId)) {
        likeButtonClass = "likeButton liked";
      } else {
        likeButtonClass = "likeButton";
      }
    }
   
    return(
      <section className="mediaItem">
        <div className="profileBanner">
          <img src={this.props.mediaItem.user.profilePicture}/>
          <div>
            <p className="bold">{this.props.mediaItem.user.username}</p>
            <p>{this.props.mediaItem.location}</p>
          </div>
        </div>
        <figure className="imgContainer">
          <img className="img"src={this.props.mediaItem.images.standardResolution.url}/>
        </figure>
        <div className="itemInfo">
          <div>
          <div className="imgButtons">
            <button className={likeButtonClass} value={this.props.mediaItem.id} onClick={(e) => this.handleLike(e)}>
              <svg enableBackground="new 0 0 24 24" viewBox="0 0 24 24" width="24px" >
              <path d="M7,22L7,22c-0.5,0-0.8-0.3-0.8-1c0.5-3.7-0.9-5.1-2.6-6.6c-1.4-1.3-2.9-2.8-3.1-5.8C0.4,6.9,1,5.2,2.2,4    
              C3.3,2.7,5,2,6.7,2c0,0,0.1,0,0.1,0c2.3,0,4.4,1.3,5.5,3.4c1.2-1.6,3-2.6,5-2.6l0.2,0c1.7,0.1,3.2,0.8,4.3,2   
               c1.2,1.3,1.8,2.9,1.7,4.7l0,0.1c-0.1,4.8-5.6,9.1-15.9,12.3C7.3,22,7.2,22,7,22z M7,21l0,0.5L7,21C7,21,7,21,7,21z M6.8,3   
                C5.3,3,3.9,3.6,2.9,4.7c-1,1.1-1.5,2.4-1.4,3.9c0.2,2.6,1.4,3.9,2.8,5.2C6,15.3,7.7,17,7.2,21c0,0,0,0,0.1,0    
                c9.8-3,15.2-7.1,15.2-11.4l0-0.2c0.1-1.5-0.4-2.9-1.4-4c-0.9-1-2.2-1.6-3.6-1.7l-0.2,0c-1.8,0-3.4,0.9-4.4,2.5c0,0,0,0,0,0.1   
                 c-0.1,0.2-0.3,0.4-0.6,0.4l0,0c-0.3,0-0.6-0.2-0.7-0.5C10.7,4.3,8.8,3,6.8,3z"/>
              </svg> 
            </button>
          </div>
          <p className="bold">{this.props.mediaItem.likes.length} gilla-markeringar</p>
          <p><span className="bold">{this.props.mediaItem.user.username}</span>&nbsp;{this.props.mediaItem.caption}&nbsp;{tags}</p>
          </div>
          <div>
          {comments}
          </div>
          <form className="commentForm">
            <textarea placeholder="kommentera..."/>
            <button>Publicera</button>
          </form>
        </div>
      </section>
    );
  }
}
const MediaItem = connect(mapStateToProps)(ConnectedMediaItem);

export default MediaItem;