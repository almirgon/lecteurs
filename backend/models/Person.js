const mongoose = require('mongoose')

const Person = mongoose.model('User', {
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String
})

module.exports = Person