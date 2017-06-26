import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import PolymerLogo from '../../assets/frameworks/polymer.png';
import ReactLogo from '../../assets/frameworks/react.png';
import VueLogo from '../../assets/frameworks/vue.png';
import './style.css';

class Frameworks extends Component {
  render() {
    return (
      <div className="frameworks">
        <h2 className="section-catch-phrase">Plays well with</h2>
        <LazyLoad height={201}>
          <div style={{minHeight: 201}}>
            <div className="framework">
              <a
                href="lab/polymer/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <img alt="Polymer Logo" src={PolymerLogo} />
                </div>
                <hr />
                <div><h3>Polymer</h3></div>
              </a>
            </div>
            <div className="framework">
              <a
                href="lab/vue/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <img alt="React Logo" src={ReactLogo} />
                </div>
                <hr />
                <div><h3>Vue</h3></div>
              </a>
            </div>
            <div className="framework">
              <a
                href="lab/react/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <LazyLoad height={50}>
                  <img alt="Vue Logo" src={VueLogo} />
                  </LazyLoad>
                </div>
                <hr />
                <div><h3>React</h3></div>
              </a>
            </div>
          </div>
        </LazyLoad>
      </div>
    );
  }
}
export default Frameworks;
