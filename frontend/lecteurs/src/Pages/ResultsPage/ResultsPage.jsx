import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import ReviewService from "../../services/ReviewService";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import useWindowSize from "../../hooks/useResize";
import Modal from "../../components/Modal/Modal";

const ResultsPage = ({queryParam}) => {
  const URLParams = new URLSearchParams(useLocation().search);
  const query = URLParams.get(`${queryParam}`);
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const widthSize = useWindowSize();
  const navigate = useNavigate();

  const clickReview = item => {
    setSelectedItem(item);
    if (widthSize.width > 768) {
      setShowModal(true);
    } else {
      navigate(`/review-mobile/${item?.idReview}`);
    }
  };

  const updateReview = review => {
    const idx = results.findIndex(el => el.idReview === review.idReview);
    const newReviews = [...results];
    newReviews[idx] = review;
    setResults(newReviews);
    setSelectedItem(review);
  };

  useEffect(() => {
    setNotFound(false);
    setResults([]);
    setLoading(true);
    {
      queryParam === "note"
        ? ReviewService.filterReviews(query).then(
            ({data, status}) => {
              if (status === 200) {
                data?.response.forEach(item => {
                  setResults(reviews => reviews.concat(item));
                  setLoading(false);
                });
              }
            },
            ({response}) => {
              if (response.status === 404) {
                setNotFound(true);
              }
              setLoading(false);
            },
          )
        : ReviewService.searchReview(query).then(
            ({data, status}) => {
              if (status === 200) {
                data?.response.forEach(item => {
                  setResults(reviews => reviews.concat(item));
                  setLoading(false);
                });
              }
            },
            ({response}) => {
              if (response.status === 404) {
                setNotFound(true);
              }
              setLoading(false);
            },
          );
    }
  }, [query]);
  return (
    <section>
      <h2>
        {queryParam === "note"
          ? `Resultados do Filtro: ${query} ⭐`
          : `Resultados da pesquisa`}
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div className={"cards-column animeLeft"}>
          {!notFound &&
            results.map((item, index) => {
              return (
                <Card
                  openReview={() => clickReview(item)}
                  key={index}
                  index={index}
                  updateReview={updateReview}
                  item={item}
                />
              );
            })}
        </div>
      )}
      {notFound && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            textAlign: "center",
          }}
        >
          <p>Nenhum resultado encontrado</p>
        </div>
      )}
      {showModal && (
        <Modal
          updateReview={updateReview}
          item={selectedItem}
          close={setShowModal}
          idReview={selectedItem?.idReview}
        />
      )}
    </section>
  );
};

export default ResultsPage;
