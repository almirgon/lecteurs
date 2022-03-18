import React from "react";
import Rating from "react-rating";
import styles from "./Review.module.css";
import {ReactComponent as Close} from "../../assets/close.svg";
import {ReactComponent as Edit} from "../../assets/edit.svg";
import {useNavigate} from "react-router-dom";


const Review = ({stars, review, close, userId, idReview}) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  
  return (
    <div className={styles.modalReview}>
      <span className={styles.reviewTitle}>
        <Close
          className={styles.closeButton}
          onClick={() => {
            close(false);
          }}
        />
        <h3 className="subTitle">Review</h3>
        <Rating
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x medium"
          readonly
          initialRating={stars}
        />
        {userId === JSON.parse(id) && <Edit onClick={() => navigate(`/edit/review/${idReview}`)} className={styles.editButton}/>}
      </span>
      <p className="paragraph">{review}</p>
    </div>
  );
};

export default Review;
