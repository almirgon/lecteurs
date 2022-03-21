import React from "react";
import Like from "../Like/Like";
import styles from "./Card.module.css";
import dateAgo from "../../filters/dateAgo";
import useWindowSize from "../../hooks/useResize";

const Card = ({index, item, openReview, updateReview}) => {
  const widthSize = useWindowSize();

  const handleLike = like => {
    updateReview({...item, likes: like});
  };
  return (
    <div
      key={index}
      onClick={widthSize.width < 768 ? openReview : undefined}
      className={styles.cardItem}
    >
      <div className={styles.cardInfo}>
        <div className={styles.cardImg}>
          <img src={item?.coverUrl} alt={`lecteurs-cover-${item?.title}`} />
          <div
            style={{display: widthSize.width < 768 && "none"}}
            className={styles.likeBackground}
          >
            <Like
              handleLike={handleLike}
              likes={item?.likes}
              idReview={item?.idReview}
              color={"#FFFFFF"}
            />
          </div>
        </div>
        <div onClick={openReview} className={styles.myInfo}>
          <div>
            <h3> {item?.title}</h3>
            <p>{item?.author}</p>
          </div>
          <p>{item?.resume}</p>
          <div>
            <div className={styles.cardFooter}>
              <span>
                <p style={{textAlign: "end"}}>@{item?.username}</p>
                <p style={{textAlign: "end"}}>
                  Postado há {dateAgo(item?.createdDate)}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
