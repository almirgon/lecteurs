import React from "react";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Button from "../../components/Button/Button";
import Rating from "react-rating";
import styles from "./EditReview.module.css";

const EditReview = () => {
  return (
    <section className={styles.editReview}>
      <div className="forms">
        <section className="animeLeft">
          <h1 className="title">Edite Sua Review</h1>
          <Formik initialValues={{}} onSubmit={() => console.log("oi")}>
            {({isSubmitting, setFieldValue, errors}) => (
              <Form className="form">
                <label htmlFor="tittle">Título do Livro</label>
                <Field
                  disabled
                  className="input"
                  type="text"
                  name="tittle"
                  id="tittle"
                />
                <ErrorMessage className="error" name="tittle" component="p" />
                <label htmlFor="author">Autor do Livro</label>
                <Field
                  disabled
                  className="input"
                  type="text"
                  name="author"
                  id="author"
                />
                <ErrorMessage className="error" name="author" component="p" />
                <label htmlFor="resume">Resumo (/350 caracteres)</label>
                <Field
                  className="input"
                  style={{resize: "none"}}
                  as="textarea"
                  rows="4"
                  type="text"
                  name="resume"
                  id="resume"
                />
                <ErrorMessage className="error" name="resume" component="p" />
                <label htmlFor="review">Review (/3000 caracteres)</label>
                <Field
                  className="textarea"
                  style={{resize: "none"}}
                  as="textarea"
                  rows="15"
                  type="text"
                  name="review"
                  id="review"
                />
                <ErrorMessage className="error" name="review" component="p" />
                <label>Nota</label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    initialRating={1}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x medium"
                  />
                  <Button type="submit">Editar</Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </section>
  );
};

export default EditReview;
