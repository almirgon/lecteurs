import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage  } from "formik";
import * as Yup from 'yup';
import Button from '../../components/Button/Button';
import styles from './Login.module.css'

const validations = () => {
  return Yup.object().shape({
    username: Yup.string()
    .required('Campo Obrigatório'),
    password: Yup.string()
    .required('Campo Obrigatório'),
  })
}

const LoginForm = () => {
  const navigate  = useNavigate();
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
        validationSchema={validations}
      >
        {({ isValid,isSubmitting }) => (<Form className="form">
          <label htmlFor="username">Username</label>
          <Field className="input" type="text" name="username" id="username" />
          <ErrorMessage className="error" name="username" component="p" />
          <label htmlFor="password">Senha</label>
          <Field className="input" type="password" name="password" id="password" />
          <ErrorMessage className="error" name="password" component="p" />
          <Button disabled={isSubmitting || !isValid} type='submit'>Login</Button>
        </Form>)}
      </Formik>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui uma conta? Cadastre-se no site.</p>
        <Button onClick={() => {navigate('/login/register')}}>Cadastro</Button>
      </div>
      
    </section>
  )
}

export default LoginForm
