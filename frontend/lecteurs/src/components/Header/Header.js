import React, {useContext} from "react";
import {ReactComponent as Logo} from "../../assets/logo.svg";
import {ReactComponent as Add} from "../../assets/add.svg";
import {ReactComponent as Logout} from "../../assets/logout.svg";
import {Link, useNavigate} from "react-router-dom";
import styles from "./Header.module.css";
import {UserContext} from "../../context/UserContext";
import AuthService from "../../services/AuthService";
import useWindowSize from "../../hooks/useResize";

const Header = () => {
  const {authorized, setAuthorized, username, setUsername, setUserId} = useContext(UserContext);
  const navigate = useNavigate();
  const widthSize = useWindowSize();

  const handleLogout = () => {
    AuthService.logout();
    setAuthorized(false);
    setUsername("");
    setUserId("");
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        {authorized ? (
          <div className={styles.logged}>
            <p
              style={{display: widthSize.width < 768 && "none"}}
              className={styles.username}
            >
              olá, @{username} |
            </p>
            <Add
              className={styles.navButton}
              fill={"#013896"}
              onClick={() => {
                navigate("/review");
              }}
            />
            <Logout
              className={styles.navButton}
              fill={"#cf142b"}
              onClick={handleLogout}
            />
          </div>
        ) : (
          <Link className={styles.loginButton} to="/login">
            Login/Cadastro
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
