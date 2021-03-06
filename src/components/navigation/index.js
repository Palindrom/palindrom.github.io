import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <nav className="container main-nav">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><a href='/docs'>Docs</a></li>
          <li>
            <a href="https://github.com/Palindrom/Palindrom">Issue Tracker</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
