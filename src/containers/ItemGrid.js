import React, {Component} from 'react';
import './ItemGrid.css';
import uuidv1 from "uuid";

class ItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if(!this.props.mediaItems) return null;
    const content = [];
    
    if (this.props.mediaItems) {
      this.props.mediaItems.forEach(mediaItem => {
        if (mediaItem) {
          let img = <img key={uuidv1()} src={mediaItem.images.url} alt={mediaItem.caption}/>;
          content.push(img);
        }
      });
    }
  
    return ( 
      <article className="imgGrid">
        {content}
      </article>
    );
  }  
}

export default ItemGrid;