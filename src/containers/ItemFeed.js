import React, {Component} from 'react';
import './ItemGrid.css';

class ItemFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {

    const content = [];
    
    // this.props.mediaItems.forEach(item => {    
      
    //   let img = <img key={item.images.low_resolution.url} src={item.images.low_resolution.url}/>;
    //   content.push(img);
    // });
   
    return ( 
      <article className="imgGrid">
        {content}
      </article>
    );
  }
  

}

export default ItemFeed;