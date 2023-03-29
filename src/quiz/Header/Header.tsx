import React from 'react';
import { Link } from "react-router-dom";

import Analytics from "../Analytics";
import { useAppContext } from '../AppContext/contextHooks';

import * as styles from "./Header.module.css"
import UserDropdown from './UserDropdown';

const Header = () => {
    const context = useAppContext();
    return <header className={styles.container}>
    <Link
      to={"/"}
      className={styles.title}
      onClick={() => Analytics.track("navigate", { id: "MainLink" })}
    >
      <h1 >Quiz Central</h1>
    </Link>
    <div>
      {context.user? <UserDropdown />:<Link to={"/login"} className={styles.login}>login</Link>}
      
    </div>
  </header>
}

export default Header;
