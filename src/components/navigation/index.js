import React, { Component } from 'react';
import './style.css';

class Navigation extends Component {
  render() {
    return (
      <nav className="container">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="docs">Readme</a></li>
          <li>
            <a href="https://github.com/Palindrom/Palindrom">Issue Tracker</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
