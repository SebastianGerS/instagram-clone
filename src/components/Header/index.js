import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Header = () => (
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
    </header>
  );


export default Header;