const mysql = require("../mysql");
const jwt = require("jsonwebtoken");

exports.getAllReviews = async (req, res, next) => {
  try {
    const query = `select idReview, tittle, author, resume, review, note,photo,username from Review r left join User u on r.user = u.idUser order by idReview desc`;
    const results = await mysql.execute(query);
    if (results.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }
    const coisa = results.map(async (item) => {

      const userQuery = `SELECT * FROM User WHERE idUser = ?`;
      const resultUser = await mysql.execute(userQuery, [item.user]);
      
      return resultUser })
      console.log(coisa)
    return res.status(200).send({response: results});
  } catch (error) {
    console.log(error)
    return res.status(500).send({error: error});
  }
};

exports.postReview = async (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(' ');
  const decoded = jwt.verify(token[1], process.env.JWT_KEY);
  try {
    const query = `INSERT INTO Review (tittle, author, resume, note, review, photo, user) VALUES (?,?,?,?,?,?,?)`;
    const result = await mysql.execute(query, [
      req.body.tittle,
      req.body.author,
      req.body.resume,
      req.body.note,
      req.body.review,
      req.body.photo,
      decoded.idUser
    ]);
    return res.status(201).send({
      message: "Review cadastrada com sucesso",
      response: {
        idReview: result.insertId,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      error: error,
    });
  }
};

exports.putReview = async (req, res, next) => {
  try {
    const query = `UPDATE Review set title = ?, author = ?, resume = ?, note = ?, review = ?, photo = ? WHERE IdReview = ?`;
    await mysql.execute(query, [
      req.body.title,
      req.body.author,
      req.body.resume,
      req.body.note,
      req.body.review,
      req.body.photo,
      req.params.id,
    ]);
    return res.status(201).send({
      mensagem: "Review alterada com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
};

exports.searchReview = async (req, res, next) => {
  try {
    const query = `SELECT * FROM Review where LOWER(title) LIKE ? or LOWER(author) LIKE ?`;
    const results = await mysql.execute(query, [
      `%${req.query.q.toLowerCase()}%`,
      `%${req.query.q.toLowerCase()}%`,
    ]);
    if (results.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }
    return res.status(200).send({response: results});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};
