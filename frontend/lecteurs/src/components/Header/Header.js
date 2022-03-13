import React, {useContext, useState} from "react";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {ReactComponent as Add} from '../../assets/add.svg'
import {ReactComponent as Logout} from '../../assets/logout.svg'
import { Link, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import {UserContext} from '../../context/UserContext'
import AuthService from "../../services/AuthService";


const Header = () => {
  const context = useContext(UserContext)
  const {authorized,setAuthorized,username,setUsername} = context;
  const navigate = useNavigate()

  const handleLogout = () => {
    AuthService.logout()
    setAuthorized(false)
    setUsername('')
    navigate('/')
  }
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/"><Logo/></Link>
        {authorized ? <div className={styles.logged}><p className={styles.username}>olá, {username} |</p> <Add className={styles.navButton} fill={'#013896'} onClick={() => {navigate('/review')}}/> <Logout className={styles.navButton} fill={'#cf142b'} onClick={handleLogout}/> </div> : <Link className={styles.loginButton} to="/login">Login/Cadastro</Link>}
        
      </nav>
    </header>
  );
};

export default Header;
