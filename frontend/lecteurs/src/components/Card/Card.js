import React from "react";
import Like from "../Like/Like";
import styles from "./Card.module.css";
import dateAgo from "../../filters/dateAgo";

const Card = ({index, item, click}) => {
  return (
    <div key={index} className={styles.cardItem}>
      <div className={styles.cardInfo}>
        <div className={styles.cardImg}>
          <img src={item.photo} alt="card-img" />
          <div className={styles.likeBackground}>
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
                  Postado á {dateAgo(item?.postDate)}
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
