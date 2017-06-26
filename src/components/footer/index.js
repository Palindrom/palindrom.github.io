import React, { Component } from 'react';
import './style.css';
import SCLogo from '../../assets/SClogo.png';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <img src={SCLogo} alt="Starcounter Logo" />
          <p>Starcounter Opensource</p>
        </div>
      </div>
    );
  }
}
export default Footer;
