import React, {Component} from 'react';
import './ItemGrid.css';
import PropTypes from 'prop-types';
import User from '../data/Instagram/User';
import MediaItem from '../data/Instagram/MediaItems';

class ItemGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {

    const content = [];
    
    this.props.mediaItems.forEach(item => {       
      let img = <img key={item.images.low_resolution.url} src={item.images.low_resolution.url}/>;
      content.push(img);
    });
   
    return ( 
      <article className="imgGrid">
        {content}
      </article>
    );
  }
  

}

export default ItemGrid;