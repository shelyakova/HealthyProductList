import React, { Component } from 'react';
import './App.css';
import logo from './images/logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="appHeader">
        <img src={logo} className="appLogo" />
        </div>
      </div>
    );
  }
}

export default App;
