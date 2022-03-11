import React from "react";
import Like from "../Like/Like";
import styles from "./ReviewDetails.module.css";

const ReviewDetails = ({name, author, user, date, resume}) => {
  return (
    <div className={styles.modalInfo}>
      <span>
        
        <span className={styles.infoHeader}><h3 className="subTitle">{name}</h3> <Like className="closeButton"/></span>
        <p className="paragraph">{author}</p>
      </span>
      <span>
        <p className="paragraph">Postado por {user.username} (Há 4 dias)</p>
      </span>
      <p className="paragraph">Resumo: {resume}</p>
    </div>
  );
};

export default ReviewDetails;
