import React, {useState, useEffect} from 'react'

const CommentsNumber = () => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    //Pegaria o numero de comentarios da API e jogaria aqui 
    setAmount(amount +1)
  }, [amount])

  return (
    <div>
      {amount}
      <p>Comentários</p>
    </div>
  )
}

export default CommentsNumber
