import React from 'react'

const Like = ({likes, setLikes, children}) => {
  return (
    <div style={{display: 'flex'}}>
      <button onClick={setLikes(likes + 1)}>{children}</button> <p>{likes}</p>
    </div>
  )
}

export default Like
