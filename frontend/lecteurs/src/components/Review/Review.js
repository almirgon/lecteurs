import React from "react";
import {Rating} from "react-simple-star-rating";
import styles from "./Review.module.css";
import {ReactComponent as Close} from '../../assets/close.svg'

const Review = ({stars, review, close}) => {
  return (
    <div className={styles.modalReview}>
      <span className={styles.reviewTitle}>
        <Close className={styles.closeButton} onClick={() => {close(false)}}/>
        <h3 className="subTitle">Review</h3>
        <Rating readonly size={'25px'} ratingValue={stars} />
      </span>
      <p className="paragraph">{review}</p>
    </div>
  );
};

export default Review;
