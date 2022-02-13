const express = require("express");
const routes = require('./routes')
const mongoose = require('mongoose')

const Person = require('./models/Person')

const server = express();

server.use(express.json());
server.use(routes)

const DB_USER = 'almir';
const DB_PASSWORD = encodeURIComponent('cqvE2Y9HD63yWnc')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@lecteurs.7phh6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
  console.log('Conectado ao banco')
  server.listen(4000);
}).catch((err) => {
  console.log(err)
})

