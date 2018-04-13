import React, { Component } from 'react';
import './App.css';
import Navbar from './components/regions/Navbar/Navbar';
import Router from './components/routes/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Router />
      </div>
    );
  }
}

export default App;
