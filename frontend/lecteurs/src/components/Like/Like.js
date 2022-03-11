import React, {useState} from 'react'
import {ReactComponent as AddLike} from '../../assets/like.svg'
import {ReactComponent as Unlike} from '../../assets/unlike.svg'
import styles from './Like.module.css'

const Like = ({}) => {
  const [liked, setLiked] = useState(false)
  const [countLikes, setCountLikes] = useState(0)
  return (
    <div>{!liked ? <span className={styles.like}><Unlike/> {countLikes}</span> : <span className={styles.like}><AddLike/> {countLikes}</span>}</div>
  )
}

export default Like