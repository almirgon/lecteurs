import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Button from "../../components/Button/Button";

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
  const ex = (values) => {
    delete values.passwordConfirm
    alert(JSON.stringify(values, null, 2))
    return values
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastro</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", username: "", email: "", password: "" }}
        onSubmit={ex}
        validationSchema={validations}
      >
        {({ isValid,isSubmitting }) => (<Form className="form">
          <label htmlFor="firstName">Nome</label>
          <Field className="input" type="text" name="firstName" id="firstName" />
          <ErrorMessage className="error" name="firstName" component="p"  />
          <label htmlFor="lastName">Sobrenome</label>
          <Field className="input" type="text" name="lastName" id="lastName" />
          <ErrorMessage className="error" name="lastName" component="p" />
          <label htmlFor="username">Username</label>
          <Field className="input" type="text" name="username" id="username" />
          <ErrorMessage className="error" name="username" component="p" />
          <label htmlFor="email">Email</label>
          <Field className="input" type="text" name="email" id="email" />
          <ErrorMessage className="error" name="email" component="p" />
          <label htmlFor="password">Senha</label>
          <Field className="input" type="password" name="password" id="password" />
          <ErrorMessage className="error" name="password" component="p" />
          <label htmlFor="passwordConfirm">Confirmar Senha</label>
          <Field className="input" type="password" name="passwordConfirm" id="passwordConfirm" />
          <ErrorMessage className="error" name="passwordConfirm" component="p" />
          <Button disabled={isSubmitting || !isValid} type='submit'>Cadastrar</Button>
        </Form>)}
      </Formik>
    </section>
  );
};

export default Register;
