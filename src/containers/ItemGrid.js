import React, {Component} from 'react';
import GET_MEDIA_URL from '../data/Instagram//URLs';
import './ItemGrid.css';
class ItemGrid extends Component {
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
    this.props.inherited.items.forEach(item => { 
      console.log(item.images);
      let img = <img src={item.images.low_resolution.url}/>;
      content.push(img);
    });
    return (
      <section>
        {content}
      </section>
    );
  }
  
fetchImages() {
  const url = GET_MEDIA_URL;
  fetch(url)
  .then(res => res.json())
  .then(res => {

    res.data.forEach(item => {
      this.props.inherited.onAddItem(item);
    });
  });
}


}


export default ItemGrid;