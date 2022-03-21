import React from "react";
import styles from "./Modal.module.css";
import ReviewPhoto from "../ReviewPhoto/ReviewPhoto";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import Review from "../Review/Review";

const Modal = ({item, close, idReview, updateReview}) => {
  const handleOutsideClick = event => {
    if (event.target === event.currentTarget) {
      close(false);
    }
  };
  return (
    <section className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.modalContainer}>
        <ReviewPhoto photo={item?.coverUrl} name={item?.title} />
        <ReviewDetails
          updateReview={updateReview}
          item={item}
          idReview={idReview}
        />
        <Review
          close={close}
          stars={item.note}
          review={item.review}
          idUser={item.idUser}
          idReview={item.idReview}
        />
      </div>
    </section>
  );
};

export default Modal;
