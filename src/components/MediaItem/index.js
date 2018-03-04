import React, { Component } from 'react';
import './style.css';
import uuidv1 from "uuid";

class MediaItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const comments = []
    const tags = [];
    if (this.props.mediaItem.comments.data) {
      this.props.mediaItem.comments.data.forEach(comment => {
        let newComment = <p key={uuidv1()}><span className="bold">{comment.from.username}</span> {comment.text}</p>
        comments.push(newComment);
      });
    }

    if (this.props.mediaItem.tags) {
      this.props.mediaItem.tags.forEach(tag => {
        let newTag = <span key={uuidv1()}>{tag.text}</span>
        tags.push(newTag);
      });
    }
   
    return(
      <section className="mediaItem">
        <div className="profileBanner">
          <img src={this.props.mediaItem.user.profile_picture}/>
          <div>
            <p className="bold">{this.props.mediaItem.user.username}</p>
            <p>{this.props.mediaItem.location}</p>
          </div>
        </div>
        <figure className="imgContainer">
          <img className="img"src={this.props.mediaItem.images.standard_resolution.url}/>
        </figure>
        <div className="itemInfo">
          <div>
          <div className="imgButtons">
            <button className="likeButton"></button>
          </div>
          <p className="bold">{this.props.mediaItem.likes.count} gilla-markeringar</p>
          <p><span className="bold">{this.props.mediaItem.user.username}</span>&nbsp;{this.props.mediaItem.caption.text}&nbsp;{tags}</p>
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
export default MediaItem;