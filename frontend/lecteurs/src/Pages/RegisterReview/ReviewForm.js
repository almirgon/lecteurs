import React, {useState} from "react";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Button from "../../components/Button/Button";
import Rating from "react-rating";

const validations = () => {
  return Yup.object().shape({
    title: Yup.string()
      .required("Campo Obrigatório")
      .max(30, "Maximo 30 caracteres")
      .min(2, "Mínimo 2 caracteres"),
    author: Yup.string()
      .required("Campo Obrigatório")
      .max(50, "Maximo 50 caracteres")
      .min(2, "Mínimo 2 caracteres"),
    resume: Yup.string()
      .required("Campo Obrigatório")
      .max(350, "Maximo 350 caracteres")
      .min(50, "Mínimo 50 caracteres"),
    review: Yup.string()
      .required("Campo Obrigatório")
      .max(3000, "Maximo 3000 caracteres")
      .min(300, "Mínimo 300 caracteres"),
  });
};

const ReviewForm = ({
  submit,
  reviewData,
  setRatingValue,
  ratingValue,
  countResume,
  countReview,
  setCountResume,
  setCountReview,
}) => {
  const handleRating = (rate, setFieldValue) => {
    setRatingValue(rate);
    setFieldValue("note", rate);
  };

  return (
    <section className="animeLeft">
      <h1 className="title">Escreva Sua Review</h1>
      <Formik initialValues={reviewData} onSubmit={submit}>
        {({isValid, isSubmitting, setFieldValue}) => (
          <Form className="form">
            <label htmlFor="title">Título do Livro</label>
            <Field className="input" type="text" name="title" id="title" />
            <ErrorMessage className="error" name="title" component="p" />
            <label htmlFor="author">Autor do Livro</label>
            <Field className="input" type="text" name="author" id="author" />
            <ErrorMessage className="error" name="author" component="p" />
            <label htmlFor="resume">
              Resumo ({countResume}/300 caracteres)
            </label>
            <Field
              className="input"
              onKeyUp={e => {
                setCountResume(e.target.value.length);
              }}
              style={{resize: "none"}}
              as="textarea"
              rows="4"
              type="text"
              name="resume"
              id="resume"
            />
            <ErrorMessage className="error" name="resume" component="p" />
            <label htmlFor="review">
              Review ({countReview}/3000 caracteres)
            </label>
            <Field
              className="textarea"
              onKeyUp={e => {
                setCountReview(e.target.value.length);
              }}
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
                onChange={rate => handleRating(rate, setFieldValue)}
                initialRating={ratingValue}
                emptySymbol="fa fa-star-o fa-2x"
  fullSymbol="fa fa-star fa-2x medium"
              />
              <Button disabled={isSubmitting || !isValid} type="submit">
                Proximo
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ReviewForm;
