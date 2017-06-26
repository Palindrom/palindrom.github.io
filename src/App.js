import Home from './pages/home';
import Docs from './pages/docs';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact={true} component={Home} />
        <Route path="/docs" component={Docs} />
      </div>
    );
  }
}

export default App;
