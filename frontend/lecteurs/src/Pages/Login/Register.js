import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import {UserContext} from "../../context/UserContext";
import Spinner from "../../components/Loading/Spinner/Spinner";

const validations = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Mínimo 4 caracteres")
      .max(20, "Máximo 20 caracteres")
      .required("Campo obrigatório"),
    lastName: Yup.string()
      .min(3, "Mínimo 4 caracteres")
      .max(20, "Máximo 20 caracteres")
      .required("Campo obrigatório"),
    username: Yup.string()
      .min(4, "Mínimo 4 caracteres")
      .max(12, "Máximo 12 caracteres")
      .required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .matches(
        /^(?=.*[A-Z])/,
        "A Senha deve conter pelo menos um caractere maiusculo",
      )
      .max(20, "Máximo 20 caracteres")
      .matches(/^(?=.*[0-9])/, "A Senha deve conter pelo menos um número")
      .required("Campo Obrigatório"),
    passwordConfirm: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .matches(
        /^(?=.*[A-Z])/,
        "A Senha deve conter pelo menos um caractere maiusculo",
      )
      .max(20, "Máximo 20 caracteres")
      .matches(/^(?=.*[0-9])/, "A Senha deve conter pelo menos um número")
      .required("Campo Obrigatório")
      .oneOf([Yup.ref("password"), null], "As senhas não correspondem"),
  });
};

const Register = () => {
  const swalNotification = withReactContent(Swal);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {setUsername, setAuthorized} = context;

  const submit = (values, {setSubmitting}) => {
    setLoading(true);
    delete values.passwordConfirm;
    UserService.createUser(values).then(
      response => {
        if (response.status === 201) {
          setSubmitting(false);
          setLoading(false);
          swalNotification
            .fire({
              title: `${response.data.message}`,
              html: (
                <div>
                  <p>
                    Olá {response.data.response.user.firstName}! Seja bem vindx
                    ao Lecterus 😀📚
                  </p>
                  <p>
                    Aqui você poderá compartilhar e ler diferentes reviews de
                    milhares de livros
                  </p>
                </div>
              ),
              icon: "success",
              showConfirmButton: true,
              confirmButtonColor: "rgb(1, 56, 150)",
              confirmButtonText: "Vamos lá :P",
            })
            .then(result => {
              if (result.isConfirmed) {
                const credentials = {
                  login: values.email,
                  password: values.password,
                };
                AuthService.login(credentials).then(
                  response => {
                    if (response.status === 200) {
                      setAuthorized(true);
                      setUsername(response.data.username);
                      navigate("/");
                    }
                  },
                  err => {
                    navigate("/");
                  },
                );
              }
            });
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
      <h1 className="title">Cadastro</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={submit}
        validationSchema={validations}
      >
        {({isValid, isSubmitting}) => (
          <Form className="form">
            <label htmlFor="firstName">Nome</label>
            <Field
              className="input"
              type="text"
              name="firstName"
              id="firstName"
            />
            <ErrorMessage className="error" name="firstName" component="p" />
            <label htmlFor="lastName">Sobrenome</label>
            <Field
              className="input"
              type="text"
              name="lastName"
              id="lastName"
            />
            <ErrorMessage className="error" name="lastName" component="p" />
            <label htmlFor="username">Username</label>
            <Field
              className="input"
              type="text"
              name="username"
              id="username"
            />
            <ErrorMessage className="error" name="username" component="p" />
            <label htmlFor="email">Email</label>
            <Field className="input" type="text" name="email" id="email" />
            <ErrorMessage className="error" name="email" component="p" />
            <label htmlFor="password">Senha</label>
            <Field
              className="input"
              type="password"
              name="password"
              id="password"
              autoComplete="on"
            />
            <ErrorMessage className="error" name="password" component="p" />
            <label htmlFor="passwordConfirm">Confirmar Senha</label>
            <Field
              className="input"
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              autoComplete="off"
            />
            <ErrorMessage
              className="error"
              name="passwordConfirm"
              component="p"
            />
            <Button disabled={isSubmitting || !isValid} type="submit">
              {loading ? <Spinner /> : "Cadastro"}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Register;
