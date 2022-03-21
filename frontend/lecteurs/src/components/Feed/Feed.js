import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import ReviewService from "../../services/ReviewService";
import useWindowSize from "../../hooks/useResize";
import Loading from "../Loading/Loading";

const Feed = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErros] = useState(false);
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const widthSize = useWindowSize();

  const updateReview = review => {
    const idx = reviews.findIndex(el => el.idReview === review.idReview);
    const newReviews = [...reviews];
    newReviews[idx] = review;
    setReviews(newReviews);
    setSelectedItem(review);
  };

  const clickReview = item => {
    setSelectedItem(item);
    if (widthSize.width > 768) {
      setShowModal(true);
    } else {
      navigate(`review-mobile/${item?.idReview}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    ReviewService.getAllReviews().then(
      ({data, status}) => {
        if (status === 200) {
          setReviews(data?.response);
          setLoading(false);
        }
      },
      err => {
        setStatus(status);
        setLoading(false);
        setErros(true);
      },
    );
  }, []);

  return (
    <section>
      <h2>Feed</h2>
      <div className={"cards animeLeft"}>
        {loading ? (
          <div className={"center"}>
            <Loading />
          </div>
        ) : !errors ? (
          reviews.map((item, index) => {
            return (
              <Card
                openReview={() => clickReview(item)}
                key={index}
                index={index}
                item={item}
                updateReview={updateReview}
              />
            );
          })
        ) : (
          <div className={"center"}>
            {status === 404 ? "Nenhum resultado encontrado" : "Ocorreu um erro"}
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          updateReview={updateReview}
          item={selectedItem}
          idReview={selectedItem?.idReview}
          close={setShowModal}
        />
      )}
    </section>
  );
};

export default Feed;
