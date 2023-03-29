import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CreateAccount.module.css';

const CreateAccount = () => {

    return <div className={styles.container}>
        <form className={styles.box} action="/createAccount" method="post">
        <label>
            <span>Username</span>
            <input required type="text" name="username" placeholder={"username"}></input>
        </label>
        <label>
          <span>Email</span>
          <input required type="text" name="email" placeholder={"email"}></input>
        </label>
        <label>
            <span>Password</span>
            <input
                type="password"
                name="password"
                placeholder={"Password"}
                required 
            ></input>
        </label>
        <div> Password must contain: 
            <ul>
                <li>at least 8 characters</li>
                <li>One upper and lower case letter</li>
                <li>One number</li>
                <li>One special character i.e.(!,@,#,$,%,^,&,*)</li>
            </ul>
        </div>
        <div className={styles.footer}>
            <Link to="/login">Cancel</Link>
            <button type="submit">Create Account</button>
        </div>
        </form>
    </div>
}

export default CreateAccount;