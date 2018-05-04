import * as React from 'react';
import './App.css';
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';

import MainList from './MainList';
import Tabs from './Tabs/Tabs';
import FeatureDisplay from './FeatureDisplay';

import history from './history';

type AppProps = {

};

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <Link to={'/'} className={'Main-Link'}>
              <h1 className="App-title">Alycia Pace</h1>
            </Link>
          </header>
          <Route path={'/:view?'} component={Tabs}/>
          <Route path={'/:view?'} component={FeatureDisplay}/>
          <Route path={'/:view?'} component={MainList}/>
        </div>
      </Router>
    );
  }
}

export default App;
