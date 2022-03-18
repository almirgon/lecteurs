import React from "react";
import {Routes, Route} from "react-router-dom";
import LoginForm from "./LoginForm";
import Register from "./Register";
import styles from "./Login.module.css";
import NotFound from "../NotFound/NotFound";

const Login = () => {
  return (
    <section className={styles.login}>
      <div className="forms">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
