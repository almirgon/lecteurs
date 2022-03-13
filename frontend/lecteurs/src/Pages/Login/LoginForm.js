import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";
import AuthService from "../../services/AuthService";
import {UserContext} from "../../context/UserContext";

const validations = () => {
  return Yup.object().shape({
    login: Yup.string().required("Campo Obrigatório"),
    password: Yup.string().required("Campo Obrigatório"),
  });
};

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const {setUsername, setAuthorized} = context;

  const submit = values => {
    AuthService.login(values).then(
      response => {
        if (response.status === 200) {
          setAuthorized(true);
          setUsername(response.data.username);
          navigate("/");
        }
      },
      err => {
        console.log(err);
      },
    );
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <Formik
        initialValues={{login: "", password: ""}}
        onSubmit={submit}
        validationSchema={validations}
      >
        {({isValid, isSubmitting}) => (
          <Form className="form">
            <label htmlFor="login">Email | username</label>
            <Field className="input" type="text" name="login" id="login" />
            <ErrorMessage className="error" name="login" component="p" />
            <label htmlFor="password">Senha</label>
            <Field
              className="input"
              type="password"
              name="password"
              id="password"
            />
            <ErrorMessage className="error" name="password" component="p" />
            <Button disabled={isSubmitting || !isValid} type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui uma conta? Cadastre-se no site.</p>
        <Button
          onClick={() => {
            navigate("/login/register");
          }}
        >
          Cadastro
        </Button>
      </div>
    </section>
  );
};

export default LoginForm;
