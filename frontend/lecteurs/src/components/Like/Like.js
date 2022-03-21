import React, {useContext} from "react";
import {ReactComponent as AddLike} from "../../assets/unlike.svg";
import styles from "./Like.module.css";
import ReviewService from "../../services/ReviewService";
import {UserContext} from "../../context/UserContext";

const Like = ({color, idReview, likes, handleLike}) => {
  const {authorized} = useContext(UserContext);

  const handleClick = () => {
    ReviewService.like(idReview).then(({data, status}) => {
      if (status === 200) {
        handleLike(data?.likes);
      }
    });
  };

  return (
    <button
      disabled={!authorized}
      style={{color: color}}
      onClick={handleClick}
      className={styles.like}
    >
      <AddLike /> {likes}
    </button>
  );
};

export default Like;
