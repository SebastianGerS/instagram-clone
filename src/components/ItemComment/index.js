import React, { Component } from 'react';
import './style.css';
import uuidv1 from "uuid";
import {deleteComment, updateComment} from '../../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    token:  state.token,
    currentUserId: state.currentUserId,
    currentUser: state.currentUser
  };
};

class ConnectedItemComment extends Component {

  constructor(props) {
    super(props);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.state = {
      updatedFields: [],
      text: this.props.comment.text,
      isBeingEdited: false,
      modal: [],
    }
  }
  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
  }
  removeComment() {
    const field = [{
      name: 'comments',
      value: {
        _id: this.props.comment._id,
      }
    }];
    this.props.dispatch(deleteComment(this.props.mediaItem._id, this.props.comment._id, this.props.token.value ,field));
  }
  
  updateComment(e) {
    e.preventDefault();
    const field = [{
      name: 'comments',
      value: {
        text: this.state.text,
        _id: this.props.comment._id,
      }
    }];
    this.props.dispatch(updateComment(this.props.mediaItem._id, this.props.comment._id, this.props.token.value, field));
    this.toggleCommentModal();
  }
  toggleCommentModal() {

    let modal;
    if(!this.state.isBeingEdited) {
      modal =
      <section className="editCommentModal">
        <h3>Edit Comments</h3>
        <form key={uuidv1()} className="editCommentForm" onSubmit={this.updateComment}>
            <p className="bold">{this.props.comment.user.username}</p>
            <textarea required name="text" onChange={this.updateStateValue} defaultValue={this.state.text}></textarea>
            <button className="submitButton" >Publicera</button>
        </form>
      </section>;
    }
   
    this.setState({
      isBeingEdited: !this.state.isBeingEdited,
      modal: [modal]
    });
  };

  render() {
    const comments = [];
    let newcomment;
    if (this.props.mediaItem.user._id == this.props.currentUser._id || this.props.comment.user._id == this.props.currentUser._id) {
     
        newcomment = 
          <p key={uuidv1()} className="comments">
            <span>
              <span className="bold">{this.props.comment.user.username}</span>&nbsp;{this.props.comment.text}
            </span>
            <span>
              <button className="optionsButton" onClick={this.toggleCommentModal}></button>
              <button className="removeButton" onClick={this.removeComment}></button>
            </span>
          </p>;
     
    } else  {
      newcomment = <p key={uuidv1()}><span className="bold">{this.props.comment.user.username}</span>&nbsp;{this.props.comment.text}</p>;
    }
    comments.push(newcomment);
    return(
      <div>
      {comments}
      {this.state.modal}
      </div>
    );
  }
}

const ItemComment = connect(mapStateToProps)(ConnectedItemComment);

export default ItemComment;