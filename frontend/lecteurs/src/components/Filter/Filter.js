import React, {useState, useEffect, useRef} from 'react';
import { Formik, Field, Form } from 'formik';
import {Rating} from "react-simple-star-rating";
import styles from './Filter.module.css'
import {ReactComponent as FilterButton} from '../../assets/filter.svg';
import {ReactComponent as DoneButton} from '../../assets/done.svg';
import {ReactComponent as CleanFilter} from '../../assets/clean.svg';

const Filter = () => {
  const [open, setOpen] = useState(false)
  const [select, setSelect] = useState('')
  const filterRef = useRef();

  useEffect(() => {
    const outsideClick = (e) => {
      if(open && filterRef.current && !filterRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", outsideClick);
    return () => {
      document.removeEventListener("mousedown", outsideClick);
    }
  },[open])

  return (<>
  <div className={styles.dropdown} ref={filterRef}>
    <span className={styles.filterButton} onClick={() => {setOpen(!open)}}>
      <FilterButton className={styles.filterIcon}/>
    </span>
    
  {open && <Formik 
  initialValues={{
    note: select,
  }}
  onSubmit={(values) => {
    alert(JSON.stringify(values, null, 2));
    setSelect(values.note)
    setOpen(false)
  }}

>{({ values }) => (
        <Form className={styles.dropdownContent}>
          <p style={{margin: '0', color: 'gray',
    padding: '0.5rem'}}>Filtrar por nota</p>
          <div className={styles.starsGroup} role="group">
            <label>
              <Field type="radio" name="note" value="20" />
              <Rating readonly size={'25px'} ratingValue={20} />
            </label>
            <label>
              <Field type="radio" name="note" value="40" />
              <Rating readonly size={'25px'} ratingValue={40} />
            </label>
            <label>
              <Field type="radio" name="note" value="60" />
              <Rating readonly size={'25px'} ratingValue={60} />
            </label>
            <label>
              <Field type="radio" name="note" value="80" />
              <Rating readonly size={'25px'} ratingValue={80} />
            </label>
            <label>
              <Field type="radio" name="note" value="100" />
              <Rating readonly size={'25px'} ratingValue={100} />
            </label>
          </div>
          <span className={styles.filterBtns}> <button className={styles.filterBtn} style={{width: '50%'}} disabled={values.note === ''} type="submit"> <DoneButton /></button> 
          <button className={styles.cleanFilterBtn} onClick={() => {setSelect(''); setOpen(false)}} style={{width: '50%'}} type="reset"><CleanFilter /></button></span>
         
        </Form> )}</Formik>}
        </div>
        </>)
};

export default Filter;
