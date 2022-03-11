import React, {useState, useEffect} from 'react';
import styles from './Scroll.module.css'
import {ReactComponent as Top} from '../../assets/top.svg'

const Scroll = () => {
  const [showScroll, setShowScroll] = useState(false)

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 500){
        setShowScroll(true)
      }else{
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', checkScrollTop)

    return () => window.removeEventListener("scroll", checkScrollTop);

  }, [])

 
  return <>{showScroll && <div onClick={scrollTop} className={styles.scrollTop}><Top fill={'context-fill'}/></div>}</>;
};

export default Scroll;
