import React, { Component } from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import GHLogo from '../../assets/github-logo.png';

class Header extends Component {
  render() {
    return (
      <div className="header-wrapper">
        <div className="github-logo">
          <a
            href="https://github.com/Palindrom/Palindrom"
            target="_blank"
            rel="noopener"
            title="Fork me on GitHub"
          >
            <img src={GHLogo} alt="Fork me on GitHub" />
          </a>
        </div>
        <nav className="container">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Issue Tracker</a></li>
            <li><a href="#">Examples</a></li>
            <li><a href="#">Related Projects</a></li>
          </ul>
        </nav>
        <div className="header">
          <div>
            <img src={logo} alt="Palindrom Logo" />
          </div>
          <div>
            <h1>
              Library for two-way data binding between local JSON view models
              and
              remote, using JSON-Patch, with optional Operational
              Transformation, via HTTP or WebSocket.
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
