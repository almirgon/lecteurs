import React, {useState} from "react";
import {ReactComponent as AddLike} from "../../assets/like.svg";
import {ReactComponent as Unlike} from "../../assets/unlike.svg";
import styles from "./Like.module.css";
import ReviewService from "../../services/ReviewService";

const Like = ({color, likes, idReview}) => {
  const [liked, setLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  const handleClick = () => {
    ReviewService.like(idReview).then(({data, status}) => {
      if (status === 200) {
        setCountLikes(data[0].likes);
        setLiked(!liked);
      }
    });
  };

  return (
    <>
      {liked ? (
        <button
          style={{color: color}}
          onClick={handleClick}
          className={styles.like}
        >
          <Unlike /> {countLikes}
        </button>
      ) : (
        <button
          style={{color: color}}
          onClick={handleClick}
          className={styles.like}
        >
          <AddLike /> {countLikes}
        </button>
      )}
    </>
  );
};

export default Like;
