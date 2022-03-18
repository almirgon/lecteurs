import React from "react";
import Like from "../Like/Like";
import styles from "./Card.module.css";
import dateAgo from "../../filters/dateAgo";
import useWindowSize from "../../hooks/useResize";

const Card = ({index, item, click}) => {
  const size = useWindowSize();
  return (
    <div key={index} onClick={size.width < 768 ? click : undefined} className={styles.cardItem}>
      <div className={styles.cardInfo}>
        <div className={styles.cardImg}>
          <img src={item.photo} alt="card-img" />
          <div style={{display: size.width < 768 && 'none'}} className={styles.likeBackground}>
            <Like likes={item?.likes} idReview={item.idReview} color={"#FFFFFF"} />
          </div>
        </div>
        <div onClick={click} className={styles.myInfo}>
          <div>
            <h3> {item?.tittle}</h3>
            <p>{item?.author}</p>
          </div>
          <p>
            {item?.resume}
          </p>
          <div>
            <div className={styles.cardFooter}>
              <span>
                <p style={{textAlign: "end"}}>@{item?.username}</p>
                <p style={{textAlign: "end"}}>
                  Postado há {dateAgo(item?.postDate)}
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
