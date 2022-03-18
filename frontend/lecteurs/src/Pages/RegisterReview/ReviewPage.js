import React, {useState, useContext} from "react";
import styles from "./Review.module.css";
import {Routes, Route, Navigate} from "react-router-dom";
import ReviewPhoto from "./ReviewPhoto";
import ReviewForm from "./ReviewForm";
import NotFound from "../NotFound/NotFound";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext";

const PrivateRoute = ({children, redirect}) => {
  const context = useContext(UserContext);
  const {authorized} = context;
  const redirectPath = redirect ?? "/login";

  return authorized ? children : <Navigate to={redirectPath} />;
};

const ReviewPage = () => {
  const navigate = useNavigate();

  const [reviewData, setReviewData] = useState({
    tittle: "",
    author: "",
    resume: "",
    note: 0,
    review: "",
    photo: "",
  });
  const [rating, setRatingValue] = useState(0);
  const [countResumeCharacters, setCountResumeCharacters] = useState(0);
  const [countReviewCharacters, setCountReviewCharacters] = useState(0);

  const handleSubmit = (values, {setSubmitting}) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    setReviewData(values);
    navigate("/review/send-photo");
  };
  return (
    <section className={styles.review}>
      <div className="forms">
        <Routes>
          <Route
            path="/"
            element={
              <ReviewForm
                submit={handleSubmit}
                reviewData={reviewData}
                ratingValue={rating}
                setRatingValue={setRatingValue}
                countResume={countResumeCharacters}
                countReview={countReviewCharacters}
                setCountResume={setCountResumeCharacters}
                setCountReview={setCountReviewCharacters}
              />
            }
          />
          <Route
            path="/send-photo"
            element={<ReviewPhoto reviewData={reviewData} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default ReviewPage;
