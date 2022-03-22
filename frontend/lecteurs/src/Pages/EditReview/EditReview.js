import React, {useEffect, useState, useContext} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import Button from "../../components/Button/Button";
import {Rating} from "react-simple-star-rating";
import styles from "./EditReview.module.css";
import {useParams, useNavigate} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import Loading from "../../components/Loading/Loading";
import Spinner from '../../components/Loading/Spinner/Spinner'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {UserContext} from "../../context/UserContext";

const EditReview = () => {
  const {id} = useParams();
  const swalNotification = withReactContent(Swal);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const {userId} = context;
  const [loading, setLoading] = useState(false);
  const [rating, setRatingValue] = useState(0);
  const [initialValues, setInitialValues] = useState("");

  useEffect(() => {
    setLoading(true);
    ReviewService.getReviewById(id).then(
      ({data, status}) => {
        if (status === 200) {
          if (data.idUser !== userId) navigate("/");
          const initialValues = {
            title: data?.title,
            author: data?.author,
            resume: data?.resume,
            review: data?.review,
            note: data?.note,
            coverUrl: data?.coverUrl,
          };
          setInitialValues(initialValues);
          setLoading(false);
        }
      },
      err => {
        if (err.response.status === 404) navigate("/");
      },
    );
  }, [id]);

  const onSubmit = (values,{setSubmitting}) => {
    setSubmitting(true)
    ReviewService.putReview(id, values).then(
      ({data, status}) => {
        if (status === 200) {
          setSubmitting(false);
          swalNotification
            .fire({
              title: `${data.message}`,
              icon: "success",
              timer: 3000,
              showCancelButton: false,
              showConfirmButton: false,
              timerProgressBar: true,
            })
            .then(() => {
              navigate("/");
            });
        }
      },
      err => {
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
          title: `Ocorreu um erro`,
        });
      },
    );
  };
  const handleRating = (rate, setFieldValue) => {
    setRatingValue(rate);
    setFieldValue("note", rate);
  };
  return (
    <section className={styles.editReview}>
      <div className="forms">
        <section className="animeLeft">
          {loading ? (
            <div className={"center"}>
              <Loading />
            </div>
          ) : (
            <>
              <h1 className="title">Edite Sua Review</h1>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
              >
                {({values, setFieldValue, handleChange, setSubmitting, isSubmitting}) => (
                  <Form className="form">
                    <label htmlFor="tittle">Título do Livro</label>
                    <Field
                      disabled
                      className="input"
                      value={values.title || ""}
                      type="text"
                      name="tittle"
                      id="tittle"
                    />
                    <ErrorMessage
                      className="error"
                      name="tittle"
                      component="p"
                    />
                    <label htmlFor="author">Autor do Livro</label>
                    <Field
                      disabled
                      onChange={handleChange}
                      className="input"
                      type="text"
                      name="author"
                      value={values.author || ""}
                      id="author"
                    />
                    <ErrorMessage
                      className="error"
                      name="author"
                      component="p"
                    />
                    <label htmlFor="resume">Resumo</label>
                    <Field
                      className="input"
                      style={{resize: "none"}}
                      as="textarea"
                      rows="4"
                      type="text"
                      onChange={handleChange}
                      value={values.resume || ""}
                      name="resume"
                      id="resume"
                    />
                    <ErrorMessage
                      className="error"
                      name="resume"
                      component="p"
                    />
                    <label htmlFor="review">Review</label>
                    <Field
                      className="textarea"
                      style={{resize: "none"}}
                      as="textarea"
                      rows="15"
                      type="text"
                      name="review"
                      value={values.review || ""}
                      id="review"
                    />
                    <ErrorMessage
                      className="error"
                      name="review"
                      component="p"
                    />
                    <label>Nota</label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                onClick={rate => handleRating(rate, setFieldValue)}
                ratingValue={values.note || ""}
              />
                      <Button type="submit">{isSubmitting ? <Spinner/> : 'Editar'}</Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default EditReview;
