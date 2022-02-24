import React, {useState} from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage  } from "formik";
import Button from '../../components/Button/Button';
import { Rating } from 'react-simple-star-rating'
import reviewService from '../../services/reviewService';


const validations = () => {
  return Yup.object().shape({
    title: Yup.string()
    .required('Campo Obrigatório').max(30, 'Maximo 30 caracteres').min(2, 'Mínimo 2 caracteres'),
    author: Yup.string()
    .required('Campo Obrigatório').max(50, 'Maximo 50 caracteres').min(2, 'Mínimo 2 caracteres'),
    resume: Yup.string()
    .required('Campo Obrigatório').max(350, 'Maximo 350 caracteres').min(50, 'Mínimo 50 caracteres'),
    note: Yup.number()
    .required('Campo Obrigatório')
    .required('Campo Obrigatório').max(3000, 'Maximo 3000 caracteres').min(300, 'Mínimo 300 caracteres'),
    photo: Yup.string()
    .required('Campo Obrigatório')
  })
}

const ReviewForm = () => {

  const [countResumeCharacters, setCountResumeCharacters] = useState(0);
  const [countReviewCharacters, setCountReviewCharacters] = useState(0);
  const [rating, setRatingValue] = useState(0)
  
  const handleRating = (rate) => {
    setRatingValue(rate)
  }

  const navigate  = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    reviewService.sendReview(values).then((response) => {
      if(response.status === 201){
        console.log(response.data)
      }
    })
    setSubmitting(false);
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Escreva Sua Review</h1>
      <Formik
        initialValues={{ title: "", author: "", resume: "", note: 0, photo: "", review: "" }}
        onSubmit={handleSubmit}
      >
        {({ isValid,isSubmitting }) => (<Form className="form">
          <label htmlFor="title">Título do Livro</label>
          <Field className="input" type="text" name="title" id="title" />
          <ErrorMessage className="error" name="title" component="p" />
          <label htmlFor="author">Autor do Livro</label>
          <Field className="input" type="text" name="author" id="author" />
          <ErrorMessage className="error" name="author" component="p" />
          <label htmlFor="resume">Resumo ({countResumeCharacters}/300 caracteres)</label>
          <Field className="input" onKeyUp={(e) => {setCountResumeCharacters(e.target.value.length)}} style={{resize: 'none'}} as="textarea" rows="4" type="text" name="resume" id="resume" />
          <ErrorMessage className="error" name="resume" component="p" />
          <label htmlFor="photo">Link da photo</label>
          <Field className="input" type="text" name="photo" id="photo" />
          <ErrorMessage className="error" name="photo" component="p" />
          <label htmlFor="author">Review ({countReviewCharacters}/3000 caracteres)</label>
          <Field className="textarea" onKeyUp={(e) => {setCountReviewCharacters(e.target.value.length)}} style={{resize: 'none'}} as="textarea" rows="15" type="text" name="review" id="review" />
          <ErrorMessage className="error" name="review" component="p" />
          <label>Nota</label>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Rating onClick={handleRating} ratingValue={rating}/>
          <Button disabled={isSubmitting} type='submit'>Proximo</Button>
          </div>
        </Form>)}
      </Formik>
    </section>
  )
}

export default ReviewForm