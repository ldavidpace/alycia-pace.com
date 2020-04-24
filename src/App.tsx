import * as React from 'react';
import {
  Router,
  Route,
  Link,
} from 'react-router-dom';

import MainList from './MainList';
import Tabs from './Tabs/Tabs';
import FeatureDisplay from './FeatureDisplay';
import Analytics from './Analytics';

import history from './history';

import * as styles from './App.module.css';

type AppProps = {

};

class App extends React.Component<AppProps> {
  render() {
    return (
      <Router history={history}>
        <div className={styles.App}>
          <header className={styles["App-header"]}>
            <Link to={'/'} className={styles['Main-Link']} onClick={() => Analytics.track('navigate', {id: 'MainLink'})}>
              <h1 className={styles["App-title"]}>Alycia Pace</h1>
            </Link>
          </header>
          <Route path={'/:view?'} component={Tabs} />
          <Route path={'/:view?'} component={FeatureDisplay} />
          <Route path={'/:view?'} component={MainList} />
        </div>
      </Router>
    );
  }
}

export default App;
