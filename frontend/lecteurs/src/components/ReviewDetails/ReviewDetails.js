import React from "react";
import styles from "./ReviewDetails.module.css";

const ReviewDetails = ({name, author, user, date, resume}) => {
  return (
    <div className={styles.modalInfo}>
      <span>
        <h3 className="subTitle">{name}</h3>
        <p className="paragraph">{author}</p>
      </span>
      <span>
        <p className="paragraph">Postado por - (Há 4 dias)</p>
      </span>
      <p className="paragraph">Resumo: {resume}</p>
    </div>
  );
};

export default ReviewDetails;