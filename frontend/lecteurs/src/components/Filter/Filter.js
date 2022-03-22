import React, {useState, useEffect, useRef} from "react";
import {Formik, Field, Form} from "formik";
import {useNavigate} from "react-router-dom";
import Rating from "react-rating";
import styles from "./Filter.module.css";
import {ReactComponent as FilterButton} from "../../assets/filter.svg";
import {ReactComponent as DoneButton} from "../../assets/done.svg";
import {ReactComponent as CleanFilter} from "../../assets/clean.svg";

const Filter = ({filterReview}) => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");
  const navigate = useNavigate();
  const filterRef = useRef();

  useEffect(() => {
    const outsideClick = e => {
      if (open && filterRef.current && !filterRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [open]);

  return (
    <>
      <div className={styles.dropdown} ref={filterRef}>
        <span
          className={styles.filterButton}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FilterButton className={styles.filterIcon} />
        </span>

        {open && (
          <Formik
            initialValues={{
              note: select,
            }}
            onSubmit={values => {
              setSelect(values.note);
              setOpen(false);
              filterReview(values.note);
            }}
          >
            {({values}) => (
              <Form className={styles.dropdownContent}>
                <p style={{margin: "0", color: "gray", padding: "0.5rem"}}>
                  Filtrar por nota
                </p>
                <div className={styles.starsGroup} role="group">
                <label>
                    <Field type="radio" name="note" value="0" />
                      0 ⭐
                  </label>
                  <label>
                    <Field type="radio" name="note" value="20" />
                      1 ⭐
                  </label>
                  <label>
                    <Field type="radio" name="note" value="40" />
                    2 ⭐
                  </label>
                  <label>
                    <Field type="radio" name="note" value="60" />
                    
                    3 ⭐
                    
                  </label>
                  <label>
                    <Field type="radio" name="note" value="80" />
                    4 ⭐
                  </label>
                  <label>
                    <Field type="radio" name="note" value="100" />
                    5 ⭐
                  </label>
                </div>
                <span className={styles.filterBtns}>
                  <button
                    className={styles.filterBtn}
                    style={{width: "50%"}}
                    disabled={values.note === ""}
                    type="submit"
                  >
                    <DoneButton />
                  </button>
                  <button
                    className={styles.cleanFilterBtn}
                    onClick={() => {
                      setSelect("");
                      setOpen(false);
                      navigate(`/`);
                    }}
                    style={{width: "50%"}}
                    type="reset"
                  >
                    <CleanFilter />
                  </button>
                </span>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default Filter;
