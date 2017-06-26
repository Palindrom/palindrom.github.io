import React, { Component } from 'react';
import Snippet from '../snippet';

import './style.css';

class BodySection extends Component {
  render() {
    return (
      <div className="bodyDiv">
        <div className="catchPhrase">
          <h2 className='section-catch-phrase'>
            DEFINE A CONNECTION TO A REMOTE PATCH SERVER, GET AN OBJECT THAT IS PERSISTENT BETWEEN CLIENT AND SERVER!
          </h2>
        </div>
        <Snippet />
      </div>
    );
  }
}
export default BodySection;
