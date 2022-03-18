import React, {useState, useEffect} from "react";
import styles from "./ReviewMobile.module.css";
import {useParams, useNavigate} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import dateAgo from "../../filters/dateAgo";
import Loading from "../Loading/Loading";
import Rating from "react-rating";
import {ReactComponent as Edit} from '../../assets/edit.svg'

const ReviewMobile = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ReviewService.getReviewById(id).then(({data, status}) => {
      if (status === 200) {
        data?.response.forEach(reviewItem => {
          setReview(reviewItem);
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <section>
      <img
        className={styles.reviewMobileCover}
        src={review?.photo}
        alt={review?.tittle}
      ></img>
      <div className={styles.reviewMobile}>
        <div>
          <span>
            <h3 className="subTitle">{review?.tittle}</h3>
            <p className="paragraph">{review?.author}</p>
          </span>
          <span>
            <p className="paragraph">
              Postado por @{review?.username} (Há {dateAgo(review?.postDate)})
            </p>
          </span>
        </div>

        <div>
          <p className="paragraph">Resumo: {review?.resume}</p>
        </div>
        <div>
          <span>
            <h3 className="subTitle">Review</h3>
            <Rating
              emptySymbol="fa fa-star-o fa-2x"
              fullSymbol="fa fa-star fa-2x medium"
              readonly
              initialRating={review?.note}
            />
            {review?.idUser === JSON.parse(userId) && <Edit onClick={() => navigate(`/edit/review/${review?.idReview}`)} className={styles.editButton}/>}
          </span>
          <p className="paragraph">{review?.review}</p>
        </div>
      </div>
    </section>
  );
};

export default ReviewMobile;
