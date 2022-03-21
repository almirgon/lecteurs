import React from "react";
import Like from "../Like/Like";
import styles from "./ReviewDetails.module.css";
import dateAgo from "../../filters/dateAgo";

const ReviewDetails = ({idReview, updateReview, item}) => {
  const handleLike = like => {
    updateReview({...item, likes: like});
  };

  return (
    <div className={styles.modalInfo}>
      <span>
        <span className={styles.infoHeader}>
          <h3 className="subTitle">{item?.title}</h3>
          <Like
            likes={item?.likes}
            handleLike={handleLike}
            idReview={idReview}
          />
        </span>
        <p className="paragraph">{item?.author}</p>
      </span>
      <span>
        <p className="paragraph">
          Postado por @{item?.username} (Há {dateAgo(item?.createdDate)})
        </p>
      </span>
      <p className="paragraph">Resumo: {item?.resume}</p>
    </div>
  );
};

export default ReviewDetails;
