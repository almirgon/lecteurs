import React, {useState, useEffect, useContext} from "react";
import styles from "./ReviewMobile.module.css";
import {useParams, useNavigate} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import dateAgo from "../../filters/dateAgo";
import Loading from "../Loading/Loading";
import {Rating} from "react-simple-star-rating";
import {UserContext} from "../../context/UserContext";
import {ReactComponent as Edit} from "../../assets/edit.svg";

const ReviewMobile = () => {
  const {userId} = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ReviewService.getReviewById(id).then(({data, status}) => {
      if (status === 200) {
        setReview(data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <img
            className={styles.reviewMobileCover}
            src={review?.coverUrl}
            alt={review?.tittle}
          ></img>
          <div className={styles.reviewMobile}>
            <div>
              <span>
                <h3 className="subTitle">{review?.title}</h3>
                <p className="paragraph">{review?.author}</p>
              </span>
              <span>
                <p className="paragraph">
                  Postado por @{review?.username} ( Há {dateAgo(review?.createdDate)})
                </p>
              </span>
            </div>

            <div>
              <p className="paragraph">Resumo: {review?.resume}</p>
            </div>
            <div>
              <span style={{display: 'flex', gap: '0.5rem'}}>
                <h3 className="subTitle">Review</h3>
                <Rating readonly size={25} ratingValue={review?.note} />
                {review?.idUser === userId && (
                  <Edit
                    onClick={() => navigate(`/edit/review/${review?.idReview}`)}
                    style={{cursor: 'pointer'}}
                  />
                )}
              </span>
              <p className="paragraph">{review?.review}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReviewMobile;
