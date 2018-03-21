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
          let img = <figure key={uuidv1()} className="smalImgContainer"><img src={mediaItem.images.url} alt={mediaItem.caption}/></figure>;
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