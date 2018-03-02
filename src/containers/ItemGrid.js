import React, {Component} from 'react';
import './ItemGrid.css';
import {connect} from 'react-redux';
import {addItem} from '../actions';
import {GET_MEDIA_URL} from '../data/URLs';
import uuidv1 from "uuid";
const mapDispatchToProps = dispatch => {
  return {
    onAddItem: item => dispatch(addItem(item)) 
  };
};
const mapStateToProps = state => {
  return { mediaItems: state.mediaItems};
}

class ConnectedItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    this.fetchImages();
  }

  render() {

    const content = [];
    
    this.props.mediaItems.forEach(mediaItem => {
      let img = <img key={uuidv1()} src={mediaItem.images.low_resolution.url}/>;
      content.push(img);
    });
   
    return ( 
      <article className="imgGrid">
        {content}
      </article>
    );
  }

  fetchImages() {
    const url = GET_MEDIA_URL;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        res.data.forEach(item => {
          this.props.onAddItem(item);
        });
      }).catch(error => {
        console.log(error);
      });
    }
  

}
const ItemGrid = connect(mapStateToProps,mapDispatchToProps)(ConnectedItemGrid);
export default ItemGrid;