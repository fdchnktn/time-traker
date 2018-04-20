import React, { Component } from 'react';
import Navbar from 'components/regions/Navbar/Navbar';
import Router from 'components/routes/router';
import 'styles/core.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router />
      </div>
    );
  }
}

export default App;
