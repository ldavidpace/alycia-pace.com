import * as React from 'react';
import './App.css';

// const logo = require('./logo.svg');

import MainList from './MainList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Alycia Pace</h1>
        </header>
        <MainList/>
      </div>
    );
  }
}

export default App;
