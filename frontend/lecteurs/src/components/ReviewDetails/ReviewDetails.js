import React from "react";
import styles from "./ReviewDetails.module.css";
import Like from "../Like/Like";

const ReviewDetails = ({name, author, user, date, resume}) => {
  return (
    <div className={styles.modalInfo}>
      <span>
        <span style={{display: 'flex', justifyContent: 'space-between'}}> <h3 className="subTitle">{name}</h3><Like/></span>
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
