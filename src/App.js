import React, { Component } from 'react';
import Header from './components/header';
import BodySection from './components/bodySection';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BodySection />
      </div>
    );
  }
}

export default App;
