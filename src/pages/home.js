import React, { Component } from 'react';
import Header from '../components/header';
import BodySection from '../components/bodySection';
import Frameworks from '../components/frameworks';
import Footer from '../components/footer';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BodySection />
        <Frameworks />
        <Footer />
      </div>
    );
  }
}

export default Home;
