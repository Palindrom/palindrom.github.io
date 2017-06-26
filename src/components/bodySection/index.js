import React, { Component } from 'react';
import Snippet from '../snippet';

import './style.css';

class BodySection extends Component {
  render() {
    return (
      <div className="bodyDiv">
        <div className="catchPhrase">
          <h2 className='section-catch-phrase'>
            Define a connection to a remote PATCH server, get an
            object that is persistent between browser and server!
          </h2>
        </div>
        <Snippet />
      </div>
    );
  }
}
export default BodySection;
