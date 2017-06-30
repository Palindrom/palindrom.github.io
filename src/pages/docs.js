import React, { Component } from 'react';
import Navigation from '../components/navigation';
import Docs from '../components/docs';
import Footer from '../components/footer';

class DocsPage extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Docs match={this.props.match} />
        <Footer />
      </div>
    );
  }
}

export default DocsPage;
