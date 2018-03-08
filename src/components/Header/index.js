import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {loginUser, logoutUser} from '../../actions';
import {connect} from 'react-redux';
import uuidv1 from "uuid";
import {Redirect} from 'react-router';

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    logoutUser: () => dispatch(logoutUser())
  };
};

const mapStateToProps = state => {
  return {
    isLogedin:  state.isLogedin
  };
};

class ConnectedHeader extends Component {
  constructor() {
    super();
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.modal = this.modal.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      modal: [],
      email: '',
      password: '',
      modalIsActive: false
    }
  }

  componentDidUpdate(prevprops, prevstate) {
  
    if ((prevprops.isLogedin ==! this.props.isLogedin) && this.props.isLogedin === true) {
      console.log(prevprops.isLogedin);
      console.log(this.props.isLogedin);
      <Redirect to="/profile" />;
    }
  }
  login(e) {
    e.preventDefault();
    if(this.state.email.lenth <= 0 || this.state.password <= 0){
      return;
    }
    this.toggleLoginModal();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(user);
  }
  logout(e) {
    e.preventDefault();
    if (this.props.isLogedin) {
      this.props.logoutUser();
      this.toggleLoginModal();
    }
  }
  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
    }
  modal() {
    if(this.state.modalIsActive) {
      let modal;
      if (!this.props.isLogedin) {
         modal = 
        <div key={uuidv1()} className="loginModal">
          <form className="loginForm" onSubmit={(e) => this.login(e)}>
            <input name='email' type="email" placeholder="Email" onChange={this.updateStateValue}/>
            <input name='password' type="password" placeholder="Password" onChange={this.updateStateValue}/>
            <button type="submit">loggin</button>
          </form>
          <div>
            <p>If you do not have an acount please <span className="registerLink"><Link to="/register" onClick={this.toggleLoginModal}>Register</Link></span></p>
          </div>
        </div>;
        this.setState({
          modal: [modal]
        });
      } else {
        modal = 
        <div key={uuidv1()} className="loginModal">
            <button onClick={(e) => this.logout(e)}>logout</button>
        </div>;
        this.setState({
          modal: [modal]
        });
      }
    } else {
      this.setState({
        modal: []
      });
    }
   
  }
  toggleLoginModal(){
    if (this.state.modalIsActive) {
      this.setState({
        modalIsActive: false
      }, () => {
        this.modal();
      });

    } else {
      this.setState({
        modalIsActive: true
      }, () => {
        this.modal();
      });
    
    }

  }
  render() {
    return(
      <header>
        <h1>CopyGram</h1>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/profile">Profile</Link>
            </li>
            <li>
              <Link className="link" to="/explore">Explore</Link>
            </li>
          </ul>
        </nav>
        <button className="userButton" onClick={this.toggleLoginModal}></button>
        {this.state.modal}
      </header>
    );
  }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

export default Header;