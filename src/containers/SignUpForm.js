import React from 'react';
import './SignUpForm.css';

const SignUpForm = () => {

  return (
    <section>
      <div className="signup">
        <form className="signupForm">
          <input type="email" placeholder="Email"/>
          <input type="text" placeholder="Fullname"/>
          <input type="text" placeholder="Username"/>
          <input type="password" placeholder="Password"/>
          <button>signup</button>
        </form>
      </div>;
    </section>
  );
}

export default SignUpForm;