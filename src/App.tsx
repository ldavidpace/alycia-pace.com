import * as React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
// const logo = require('./logo.svg');

import MainList from './MainList';
import FeatureDisplay from './FeatureDisplay';

type AppProps = {

};

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to={'/'} className={'Main-Link'}>
              <h1 className="App-title">Alycia Pace</h1>
            </Link>
          </header>
          <Route path={'/:id'} component={FeatureDisplay}/>
          <MainList/>
        </div>
      </Router>
    );
  }
}

export default App;
