import React, { Component } from 'react';
import Snippet from '../snippet';

import './style.css';

class BodySection extends Component {
  render() {
    return (
      <div className="bodyDiv">
        <div className="catchPhrase">
          <h3>
            Define a connection to a remote PATCH server, get an
            object that is persistent between browser and server!
          </h3>
        </div>
        <Snippet />
      </div>
    );
  }
}
export default BodySection;
