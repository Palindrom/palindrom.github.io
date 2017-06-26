import React, { Component } from 'react';
import './style.css';
import SCLogo from '../../assets/SClogo.png';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <a href="https://www.starcounter.io">
            <img src={SCLogo} alt="Starcounter Logo" />
            <p>Starcounter Opensource</p>
          </a>
        </div>
      </div>
    );
  }
}
export default Footer;
