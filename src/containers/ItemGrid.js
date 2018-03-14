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

    const content = [];
    
    if (this.props.mediaItems) {
      this.props.mediaItems.forEach(mediaItem => {
        let img = <img key={uuidv1()} src={mediaItem.images.url}/>;
        content.push(img);
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