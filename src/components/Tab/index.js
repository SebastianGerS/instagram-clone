import React, { Component } from 'react';
import './style.css';

class Tab extends Component {

  getIndex = () => {
    this.props.changeTab(this.props.index);
  }

  render() {
    const className= `tab ${this.props.active}`;
    return(
      <li onClick={this.getIndex} className={className} >{this.props.name}</li>
    );
  }
}
export default Tab;