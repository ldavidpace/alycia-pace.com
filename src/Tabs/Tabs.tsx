import * as React from 'react';
import imagesFolderDef from '../images/javascriptGenImages';
import * as cx from 'classnames';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import Analytics from '../Analytics';

const styles = require('./Tabs.module.css');

type MatchProps = {
  view: string;
}

type TabState = {
  open: boolean
}
class Tabs extends React.Component<RouteComponentProps<MatchProps>, TabState> {
  state = {
    open: false,
  }
  
  handleMenuClick = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const {open} = this.state;
    const view = this.props.match.params.view;
    const tabs = imagesFolderDef.filter((folder) => folder.name.toLowerCase() !== 'other').map((folder) => folder.name);

    return <div>
      <div className={cx(styles.menuButton, {[styles.open]: open})} onClick={this.handleMenuClick}>Menu</div>
      <div className={styles.hidden}></div>
      <div className={cx(styles.tabContainer, {[styles.hidden]: !open})}>
      <Link  to={`/`} className={cx({[styles.current]: !view}, styles.tab)} onClick={() => Analytics.track('navigate', {id: 'all'})}>
        <span>
          Home
        </span>
      </Link>
        {
          tabs.map(tab =>
            <Link  key={tab} to={`/${tab}`} className={cx({[styles.current]: view === tab}, styles.tab)} onClick={() => Analytics.track('navigate', {id: tab})}>
              <span>
                {tab}
              </span>
            </Link>
          )
        }
        <Link to={`/contact`} className={cx({[styles.current]: view === 'contact'}, styles.tab)} onClick={() => Analytics.track('navigate', {id: 'contact'})}>
          Contact
        </Link>
      </div>
    </div>
  }
}

export default withRouter(Tabs)