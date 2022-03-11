import React, {useEffect} from "react";
import styles from "./Modal.module.css";
import ReviewPhoto from "../ReviewPhoto/ReviewPhoto";
import ReviewDetails from "../ReviewDetails/ReviewDetails";
import Review from "../Review/Review";

const Modal = ({item, close}) => {
  useEffect(() => {
  }, [item]);

  const handleOutsideClick = (event) => {
    if(event.target === event.currentTarget){
      close(false)
    }
  }
  return (
    <section className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.modalContainer}>
        <ReviewPhoto photo={item.photo} name={item.name} />
        <ReviewDetails name={item.name} author={item.author} user={item.user} resume={item.resume}/>
        <Review close={close} stars={item.stars} review={item.review} />
      </div>
    </section>
  );
};

export default Modal;
