import React, { Component } from 'react';
import firebase from 'firebase/app';
import './App.css';
import Navbar from './components/regions/Navbar/Navbar';
import Main from './components/routes/main';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Main />
      </div>
    );
  }
}

export default App;
