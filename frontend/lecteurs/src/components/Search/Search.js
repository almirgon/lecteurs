import React, {useEffect, useState} from "react";
import styles from "./Search.module.css";
import {Formik, Form, Field} from "formik";
import {ReactComponent as SearchLens} from "../../assets/search.svg";
import {ReactComponent as CleanSearch} from "../../assets/close.svg";
import {useLocation} from "react-router-dom";

const Search = ({searchReview}) => {
  const URLParams = new URLSearchParams(useLocation().search);
  const [searchInput, setSearchInput] = useState("")
  const query = URLParams.get(`q`);

  useEffect(() => {
    if(query){
      setSearchInput(query)
    }
  }, [])
  return (
    <Formik enableReinitialize={true} initialValues={{searchInput: searchInput}} onSubmit={searchReview}>
      {({values, handleReset}) => (
        <Form className={styles.searchForm}>
          <SearchLens
            style={{cursor: "pointer"}}
            fill={"#013896"}
            disabled={!values.searchInput}
          />
          <Field
            className={styles.searchInput}
            placeholder="Pesquisar Reviews"
            name="searchInput"
            value={values.searchInput}
          ></Field>
          <CleanSearch
            fill={"#013896"}
            style={
              values.searchInput.length > 0
                ? {display: "flex", cursor: "pointer"}
                : {display: "none"}
            }
            type="reset"
            onClick={() => {setSearchInput(""); handleReset()}}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Search;
