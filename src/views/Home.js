import React, { Component } from 'react';
import {ItemFeed, ItemGrid} from '../containers';
import { UserProfile, Tab } from '../components';
class Home extends Component  {

  constructor() {
    super();
    this.state = {
      activeTab: 0,
      tabs: { 0: 'active'},
    }

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(index) {
    return this.setState({
      activeTab: index,
      tabs: {
        [`${index}`]: 'active'
      }
    });
  }

  render() {
    let content;

    if (this.state.activeTab === 0) {
      content = <ItemGrid />;
    } else  if(this.state.activeTab === 1) {
      content = <ItemFeed />;
    }

    return (
      <div className="content">
        <UserProfile />
        <div className="tabs">
          <Tab index={0} name="Grid" changeTab={this.changeTab} active={this.state.tabs[0]}/>
          <Tab index={1} name="Flow" changeTab={this.changeTab} active={this.state.tabs[1]}/>
        </div>
        {content}
      </div>
    );
  }
}

export default Home;