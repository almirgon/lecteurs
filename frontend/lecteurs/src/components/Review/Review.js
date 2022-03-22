import React, {useContext} from "react";
import {Rating} from "react-simple-star-rating";
import styles from "./Review.module.css";
import {ReactComponent as Close} from "../../assets/close.svg";
import {ReactComponent as Edit} from "../../assets/edit.svg";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

const Review = ({stars, review, close, idUser, idReview}) => {
  const {userId} = useContext(UserContext);
  const navigate = useNavigate();

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
        <Rating readonly size={25} ratingValue={stars} />
        {idUser === userId && (
          <Edit
            onClick={() => navigate(`/edit/review/${idReview}`)}
            className={styles.editButton}
          />
        )}
      </span>
      <p className="paragraph">{review}</p>
    </div>
  );
};

export default Review;
