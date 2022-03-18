import React, {useEffect, useState} from "react";
import styles from "./Modal.module.css";
import ReviewPhoto from "../ReviewPhoto/ReviewPhoto";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import Review from "../Review/Review";
import ReviewService from "../../services/ReviewService";
import Loading from "../Loading/Loading";

const Modal = ({item, close, idReview}) => {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ReviewService.getReviewById(idReview).then(({data, status}) => {
      if (status === 200) {
        data?.response.forEach(reviewItem => {
          setReview(reviewItem);
          setLoading(false);
        });
      }
    });
  }, [item]);

  const handleOutsideClick = event => {
    if (event.target === event.currentTarget) {
      close(false);
    }
  };
  return (
    <section className={styles.modal} onClick={handleOutsideClick}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.modalContainer}>
          <ReviewPhoto photo={review.photo} name={review.tittle} />
          <ReviewDetails
            title={review.tittle}
            author={review.author}
            username={review.username}
            date={review.postDate}
            resume={review.resume}
            idReview={review.idReview}
          />
          <Review close={close} stars={review.note} review={review.review} userId={review.idUser} idReview={review.idReview}/>
        </div>
      )}
    </section>
  );
};

export default Modal;
