import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <nav className="container">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/docs'>Docs</Link></li>
          <li>
            <a href="https://github.com/Palindrom/Palindrom">Issue Tracker</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
