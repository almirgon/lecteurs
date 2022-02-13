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
          <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi atque animi iusto tenetur repellat minima, ut illo provident assumenda soluta non earum voluptates sint quibusdam. Adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas officiis molestias amet commodi</p>
          <div>
            <p style={{textAlign: 'end'}}>{item.user.username}</p>
            <p style={{textAlign: 'end'}}>Postado á 5 horas atrás</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
