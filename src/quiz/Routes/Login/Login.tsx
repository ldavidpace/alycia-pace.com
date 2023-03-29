import React from "react";
import { Link } from "react-router-dom";

import styles from "./Login.module.css";

type LoginProps = {};
const Login = ({}: LoginProps) => {
  const failedAuth = document.cookie.split('; failedAuth=')[1]?.split(';')[0];
  return (
    <div className={styles.container}>
      <form action="/login" method="post" className={styles.loginBox}>
        <div className={styles.title}>Login</div>
        {failedAuth && <div className={styles.error}> <span className={styles.exclamation}/>Could not login please try again</div>}
        <label>
          <span>Username</span>
          <input type="text" name="name" placeholder={"Username"}></input>
        </label>
        <label>
            <span>Password</span>
            <input
                type="password"
                name="password"
                placeholder={"Password"}
            ></input>
        </label>
        <button type="submit">Login</button>
        <Link className={styles.link} to={'/createAccount'}>Create Account</Link>
      </form>
    </div>
  );
};

export default Login;
