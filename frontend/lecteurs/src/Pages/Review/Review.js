import React from 'react'
import styles from './Review.module.css'
import { Routes, Route } from 'react-router-dom'
import ReviewPhoto from './ReviewPhoto'
import ReviewForm from './ReviewForm'
import NotFound from '../NotFound/NotFound'

const Review = () => {
  return (
    <section className={styles.review}>
      <div className="forms">
      <Routes>
          <Route path="/" element={<ReviewForm/>}/>
          <Route path="/send-photo" element={<ReviewPhoto/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </section>
  )
}

export default Review
