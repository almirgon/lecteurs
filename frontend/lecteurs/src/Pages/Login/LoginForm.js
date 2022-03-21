import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import styles from "./Login.module.css";
import AuthService from "../../services/AuthService";
import {UserContext} from "../../context/UserContext";
import Spinner from "../../components/Loading/Spinner/Spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validations = () => {
  return Yup.object().shape({
    login: Yup.string().required("Campo Obrigatório"),
    password: Yup.string().required("Campo Obrigatório"),
  });
};

const LoginForm = () => {
  const navigate = useNavigate();
  const swalNotification = withReactContent(Swal);
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {setUsername, setAuthorized, setUserId} = context;

  const submit = (values, {setSubmitting}) => {
    setLoading(true);
    AuthService.login(values).then(
      response => {
        if (response.status === 200) {
          setSubmitting(false);
          setAuthorized(true);
          setUsername(response.data.username);
          setUserId(response.data.id)
          setLoading(false);
          navigate("/");
        }
      },
      err => {
        setSubmitting(false);
        setLoading(false);
        const toast = swalNotification.mixin({
          toast: true,
          position: "bottom-left",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: toast => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
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
              {loading ? <Spinner /> : "Login"}
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
