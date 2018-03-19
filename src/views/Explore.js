import React, {Component} from 'react';
import {ItemGrid, ItemFeed} from '../containers';
import { Tab } from '../components';
import {connect} from 'react-redux';
import {fetchAllMediaItems} from '../actions';


const mapStateToProps = state => {
  return { mediaItems: state.mediaItems, token: state.token, isLogedin: state.isLogedin};
}

class ConnectedExplore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: { 0: 'active'},
    }

    this.changeTab = this.changeTab.bind(this);
  }

  componentWillMount() {
    if (this.props.isLogedin) {
      this.props.dispatch(fetchAllMediaItems(this.props.token.value));   
    } else {
      this.props.dispatch(fetchAllMediaItems()); 
    }
    
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
      content = <ItemGrid path={this.props.location.pathname} mediaItems={this.props.mediaItems}/>;
    } else  if(this.state.activeTab === 1) {
      content = <ItemFeed path={this.props.location.pathname} mediaItems={this.props.mediaItems} />;
    }

    return (
      <div className="content">
        <div className="tabs">
          <Tab index={0} name="Grid" changeTab={this.changeTab} active={this.state.tabs[0]}/>
          <Tab index={1} name="Flow" changeTab={this.changeTab} active={this.state.tabs[1]}/>
        </div>
        {content}
      </div>
    );
   }
}

const Explore = connect(mapStateToProps)(ConnectedExplore);

export default Explore;