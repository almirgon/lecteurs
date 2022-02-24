import React, {useState} from "react";
import styles from './Card.module.css'

const Card = ({index, item, click}) => {
  const [likes, setLikes] = useState(0);
  return (
    <div onClick={click} key={index} className={styles.myItem}>
      <div className={styles.cardInfo}>
        <div className={styles.myImg}>
          <img src={item.photo} alt="card-img" />
        </div>
        <div className={styles.myInfo}>
          <div>
          <h3> {item.name}</h3>
          <p>{item.author}</p>
          </div>
          <p>{item.resume}</p>
          <div>
            <p style={{textAlign: 'end'}}>Postado á 5 horas atrás</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;