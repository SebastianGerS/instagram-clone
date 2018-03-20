import React, {Component} from 'react';
import {Redirect} from 'react-router';
import './SignUpForm.css';
import {connect} from 'react-redux';
import {registerUser} from '../actions';

const mapStateToProps = state => {
  return {isLogedin: state.isLogedin};
}

class connectedSignUpForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      username: '',
      password: ''
    }

    this.updateStateValue = this.updateStateValue.bind(this);
    this.register = this.register.bind(this);
  }

  register(e) {
    e.preventDefault();
    if (this.state.email.length <= 0 || this.state.name.length <= 0  || this.state.username.length <= 0 || this.state.password.length <= 0 ) {
      return;
    }
    const user = {
      email: this.state.email,
      fullname: this.state.name,
      username: this.state.username,
      password: this.state.password
    }
    this.props.dispatch(registerUser(user));
  }
 
  updateStateValue(e) {
  this.setState({
      [e.target.name]: e.target.value
   });
  }
render() {
  
    if (this.props.isLogedin) {
      return <Redirect to="/profile" />;
    }
  
  return (
    <div className="signup">
      <form className="signupForm" onSubmit={this.register}>
        <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.updateStateValue}/>
        <input name="name" type="text" placeholder="Fullname" value={this.state.name} onChange={this.updateStateValue}/>
        <input name="username" type="text" placeholder="Username" value={this.state.username} onChange={this.updateStateValue}/>
        <input name="password" type="password" placeholder="Password"value={this.state.password} onChange={this.updateStateValue}/>
        <button type="submit">signup</button>
      </form>
    </div>
  );
}

}


const SignUpForm = connect(mapStateToProps)(connectedSignUpForm);
export default SignUpForm;