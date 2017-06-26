import React, { Component } from 'react';
import Navigation from '../components/navigation';
import Docs from '../components/docs';
import Footer from '../components/footer';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Docs />
        <Footer />
      </div>
    );
  }
}

export default Home;
