import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";


const SearchPage = ({mock}) => {
  const query = new URLSearchParams(useLocation().search);
  const queryResult = query.get("q");
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading,setLoading] = useState(false)

  const clickReview = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true)
    const time = setTimeout(() => {if (queryResult !== "") {
      const filteredData = mock.filter(item => {
        return (
          item.author.toLowerCase().includes(queryResult.toLowerCase()) ||
          item.name.toLowerCase().includes(queryResult.toLowerCase())
        );
      });
      setResults(filteredData);
    } else {
      setResults(mock);
    }
    setLoading(false)}, [3000])
    return () => {
      clearTimeout(time);
    };
  }, [queryResult, mock]);

  return (
    <section>
      <h2>Resultados da pesquisa</h2>
      {loading ? <Loading/> : results.length > 0 ? (
        results.map((item, index) => {
          return (
            <div className={"cards animeLeft"}>
              <Card
                click={() => clickReview(item)}
                key={index}
                index={index}
                item={item}
              />
            </div>
          );
        })
      ) : (
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
      
      {showModal && <Modal item={selectedItem} close={setShowModal} />}
    </section>
  );
};

export default SearchPage;
