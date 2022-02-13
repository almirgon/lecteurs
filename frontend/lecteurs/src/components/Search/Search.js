import React from "react";
import styles from "./Search.module.css";
import { Formik, Form, Field,  } from "formik";
import {ReactComponent as SearchLens} from '../../assets/search.svg'
import {ReactComponent as CleanSearch} from '../../assets/close.svg'

const Search = ({searchReview}) => {
  return (
    <Formik
      initialValues={{ searchInput: "" }}
      onSubmit={searchReview}
    >
       {({values, resetForm, isSubmitting}) => (
         <Form  className={styles.searchForm}>
            <SearchLens fill={'#013896'} disabled={!values.searchInput} />
           <Field className={styles.searchInput}  placeholder="Pesquisar Reviews" name="searchInput"
           value={values.searchInput}></Field>
            <CleanSearch className={styles.cleanButton} fill={'#013896'} style={values.searchInput.length > 0 ? {display: 'flex'} : {display: 'none'}} type="reset" onClick={resetForm}/>
           
         </Form>
       )}
    </Formik>
  );
};

export default Search;
