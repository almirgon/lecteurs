import React, {useState, useReducer} from 'react';
import {ReactComponent as FavoriteLiked} from '../../icons/favorite.svg'
import {ReactComponent as FavoriteUnliked} from '../../icons/favorite_border.svg'

const initialState = {
  likes: 0,
}

const likeReducer = (state, action) => {
  switch(action.type) {
    case 'HANDLE_LIKE':
      return {
        ...state,
        likes: state.likes + action.payload
      }
    case 'HANDLE_DISLIKE':
      return {
        ...state,
        likes: state.likes - action.payload
      }
    default:
      return state
  }
}

const Like = () => {
  const [isLiked, updateLike] = useState(false)
  const [state, dispatch] = useReducer(likeReducer, initialState)
  const [status, setStatus] = useState(null)
  const { likes } = state

  const handleClickLike = () => {
    if (status==='like') {
      updateLike(!isLiked)
      setStatus(null)
      dispatch({
        type: 'HANDLE_LIKE',
        payload: -1,
      })
    } else {
      setStatus('like')
      updateLike(!isLiked)
      if (status==='dislike') {
        dispatch({
          type: 'HANDLE_DISLIKE',
          payload: -1,
        })
      }
      dispatch({
        type: 'HANDLE_LIKE',
        payload: 1,
      })
    }
  }


  return <div style={{display: 'flex'}}>
    <i style={{cursor: 'pointer'}} onClick={handleClickLike}>{isLiked ? <FavoriteLiked fill={'red'}/> : <FavoriteUnliked fill={'#666666'} style={{ opacity: '0.7'}}/>}</i>
    <p style={{margin: 0, color: '#666666'}}>{likes}</p>
  </div>;
};

export default Like;
