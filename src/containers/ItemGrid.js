import React, {Component} from 'react';
import './ItemGrid.css';
import {connect} from 'react-redux';
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return { mediaItems: state.mediaItems};
}

class ConnectedItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const content = [];
    
    this.props.mediaItems.forEach(mediaItem => {
      console.log(mediaItem);
      let img = <img key={uuidv1()} src={mediaItem.images.low_resolution.url}/>;
      content.push(img);
    });
   
    return ( 
      <article className="imgGrid">
        {content}
      </article>
    );
  }  
}
const ItemGrid = connect(mapStateToProps)(ConnectedItemGrid);
export default ItemGrid;