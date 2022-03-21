const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization;
    console.log(token)
    const decode = jwt.verify(token, process.env.JWT_KEY)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).send({message: 'Falha da autenticação'})
  }
}