import React from "react";
import styles from "./ReviewPhoto.module.css";

const ReviewPhoto = ({photo, name}) => {
  return (
    <div className={styles.modalImg}>
      <img src={photo} alt={`lecteurs-cover-${name}`}></img>
    </div>
  );
};

export default ReviewPhoto;
