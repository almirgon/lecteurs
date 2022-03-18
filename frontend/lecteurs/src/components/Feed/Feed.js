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
  const size = useWindowSize();

  const clickReview = item => {
    setSelectedItem(item);
    if (size.width > 768) {
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
          data?.response.forEach(item => {
            setReviews(reviews => reviews.concat(item));
            setLoading(false);
          });
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
                click={() => clickReview(item)}
                key={index}
                index={index}
                item={item}
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
          item={selectedItem}
          idReview={selectedItem?.idReview}
          close={setShowModal}
        />
      )}
    </section>
  );
};

export default Feed;
