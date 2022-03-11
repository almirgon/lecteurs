import React, {useState, useEffect, useRef} from "react";
import {Formik, Field, Form} from "formik";
import Rating from "react-rating";
import styles from "./Filter.module.css";
import {ReactComponent as FilterButton} from "../../assets/filter.svg";
import {ReactComponent as DoneButton} from "../../assets/done.svg";
import {ReactComponent as CleanFilter} from "../../assets/clean.svg";

const Filter = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");
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
              alert(JSON.stringify(values, null, 2));
              setSelect(values.note);
              setOpen(false);
            }}
          >
            {({values}) => (
              <Form className={styles.dropdownContent}>
                <p style={{margin: "0", color: "gray", padding: "0.5rem"}}>
                  Filtrar por nota
                </p>
                <div className={styles.starsGroup} role="group">
                  <label>
                    <Field type="radio" name="note" value="1" />
                    <Rating
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star"
                      readonly
                      initialRating={1}
                    />
                  </label>
                  <label>
                    <Field type="radio" name="note" value="2" />
                    <Rating
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star "
                      readonly
                      initialRating={2}
                    />
                  </label>
                  <label>
                    <Field type="radio" name="note" value="3" />
                    <Rating
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star "
                      readonly
                      initialRating={3}
                    />
                  </label>
                  <label>
                    <Field type="radio" name="note" value="4" />
                    <Rating
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star "
                      readonly
                      initialRating={4}
                    />
                  </label>
                  <label>
                    <Field type="radio" name="note" value="5" />
                    <Rating
                      emptySymbol="fa fa-star-o "
                      fullSymbol="fa fa-star "
                      readonly
                      initialRating={5}
                    />
                  </label>
                </div>
                <span className={styles.filterBtns}>
                  {" "}
                  <button
                    className={styles.filterBtn}
                    style={{width: "50%"}}
                    disabled={values.note === ""}
                    type="submit"
                  >
                    {" "}
                    <DoneButton />
                  </button>
                  <button
                    className={styles.cleanFilterBtn}
                    onClick={() => {
                      setSelect("");
                      setOpen(false);
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
