import React from "react";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import { Link } from "react-router-dom";
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/"><Logo/></Link>
        <Link className={styles.loginButton} to="/review">Cadastrar Review</Link>
      </nav>
    </header>
  );
};

export default Header;