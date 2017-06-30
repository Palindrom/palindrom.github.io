import HomePage from './pages/home';
import DocsPage from './pages/docs';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/docs" exact={true} component={DocsPage} />
        <Route path="/docs/:version" exact={true} component={DocsPage} />
        <Route path="/docs/:version/:section" component={DocsPage} />
      </div>
    );
  }
}

export default App;
