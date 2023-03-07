import * as React from "react";
// import imagesFolderDef from '../images/javascriptGenImages';
import * as cx from "classnames";
import { Link, useParams } from "react-router-dom";
import Analytics from "../Analytics";

import * as styles from "./Tabs.module.css";

const Tabs = () => {
  const [open, setOpen] = React.useState(false);
  const params = useParams<{ view: string }>();

  const handleMenuClick = () => {
    setOpen((lastOpen) => !lastOpen);
  };

  const view = params.view;
  // const tabs = imagesFolderDef.filter((folder) => folder.name.toLowerCase() !== 'other').map((folder) => folder.name);

  return (
    <div>
      <div
        className={cx(styles.menuButton, { [styles.open]: open })}
        onClick={handleMenuClick}
      >
        Menu
      </div>
      <div className={styles.hidden}></div>
      <div className={cx(styles.tabContainer, { [styles.hidden]: !open })}>
        <Link
          to={`/`}
          className={cx({ [styles.current]: !view }, styles.tab)}
          onClick={() => {
            handleMenuClick();
            Analytics.track("navigate", { id: "all" });
          }}
        >
          <span>Home</span>
        </Link>
        {/* {
          tabs.map(tab =>
            <Link  key={tab} to={`/${tab}`} className={cx({[styles.current]: view === tab}, styles.tab)} onClick={() => {this.handleMenuClick(); Analytics.track('navigate', {id: tab})}}>
              <span>
                {tab}
              </span>
            </Link>
          )
        } */}
        <Link
          to={`/contact`}
          className={cx({ [styles.current]: view === "contact" }, styles.tab)}
          onClick={() => {
            handleMenuClick();
            Analytics.track("navigate", { id: "contact" });
          }}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Tabs;
