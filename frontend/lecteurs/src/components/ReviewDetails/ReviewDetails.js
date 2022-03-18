import React from "react";
import Like from "../Like/Like";
import styles from "./ReviewDetails.module.css";
import dateAgo from "../../filters/dateAgo";

const ReviewDetails = ({title, author, username, date, resume, idReview}) => {
  return (
    <div className={styles.modalInfo}>
      <span>
        <span className={styles.infoHeader}>
          <h3 className="subTitle">{title}</h3> <Like idReview={idReview} />
        </span>
        <p className="paragraph">{author}</p>
      </span>
      <span>
        <p className="paragraph">
          Postado por @{username} (Há {dateAgo(date)})
        </p>
      </span>
      <p className="paragraph">Resumo: {resume}</p>
    </div>
  );
};

export default ReviewDetails;
