import React, { Component } from 'react';
import './style.css';
import SCLogo from '../../assets/SClogo.png';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="logo-and-name">
            <p><img src={SCLogo} alt="Starcounter Logo" /></p>
            <p>
              <a href="https://www.starcounter.io">
                Starcounter Opensource
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
