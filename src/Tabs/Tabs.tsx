import * as React from 'react';
import imagesFolderDef from '../images/javascriptGenImages';
import * as cx from 'classnames';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
require('./Tabs.css');

type MatchProps = {
  view: string;
}

class Tabs extends React.Component<RouteComponentProps<MatchProps>> {
  render() {
    const view = this.props.match.params.view;
    const tabs = imagesFolderDef.filter((folder) => folder.name.toLowerCase() !== 'other').map((folder) => folder.name);

    return <div className={'tabContainer'}>
      {
        tabs.map(tab =>
          <span key={tab}>
            <Link to={`/${tab}`} className={cx({current: view === tab}, "tab")}>
              <span>
                {tab}
              </span>
            </Link>
          </span>
        )
      }
      <Link to={`/contact`} className={cx({current: view === 'contact'}, "tab")}>
        Contact
      </Link>
    </div>
  }
}

export default withRouter(Tabs)