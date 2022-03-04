require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const reviewRoute = require('./routes/reviewRoute')
const loginRoute = require('./routes/loginRoute')
const cors = require('cors');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.use('/user', userRoute);
app.use('/review', reviewRoute);
app.use('/login', loginRoute);

app.use((req,res,next) => {
  const erro = new Error("Rota não encontrada")
  erro.status = 404
  next(erro)
})

app.use((error,req,res,next) => {
  res.status(error.status || 500)
  return res.send({
    erro: {
      mensagem: error.message
    }
  })
})


module.exports = app;