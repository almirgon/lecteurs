import React from "react";
import Feed from "../../components/Feed/Feed";
import {useNavigate} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import ResultsPage from "../ResultsPage/ResultsPage";
import Scroll from "../../components/Scroll/Scroll";

const Home = () => {
  const navigate = useNavigate();

  const searchReview = values => {
    const searchURL = new URLSearchParams(`q=${values.searchInput}`);
    navigate(`/search?${searchURL}`);
  };

  const filterReview = note => {
    const filterURL = new URLSearchParams(`note=${note}`);
    navigate(`/filter?${filterURL}`);
  };

  return (
    <section className="container mainContainer">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Search searchReview={searchReview} />
        <Filter filterReview={filterReview} />
      </div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/search" element={<ResultsPage queryParam={"q"} />} />
        <Route path="/filter" element={<ResultsPage queryParam={"note"} />} />
      </Routes>
      <Scroll />
    </section>
  );
};
export default Home;
