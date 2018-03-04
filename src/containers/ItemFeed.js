import React, {Component} from 'react';
import './ItemFeed.css';
import uuidv1 from "uuid";
import {MediaItem} from '../components';

class ItemFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {

    const content = [];
    if(this.props.mediaItems){
      this.props.mediaItems.forEach(item => {    
        let mediaItem = <MediaItem key={uuidv1()} mediaItem={item}/>
        content.push(mediaItem);
      });
    }
  
   
    return ( 
      <article className="imgFlow">
        {content}
      </article>
    );
  }
  

}

export default ItemFeed;