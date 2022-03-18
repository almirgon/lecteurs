const mysql = require("../mysql");
const jwt = require("jsonwebtoken");
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


exports.getAllReviews = async (req, res, next) => {
  try {
    const query = `select idReview, tittle, author, resume,photo,username, review,note, postDate, (select count(*) from Likes l where l.idReview = r.idReview) as likes
    from Review r left join User u on r.user = u.idUser order by idReview desc`;
    const results = await mysql.execute(query);
    if (results.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }

    return res.status(200).send({response: results});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};

exports.filterReviewsByNote = async (req, res, next) => {
  try {
    const query = `select idReview, tittle, author, resume,photo,username, review,note, postDate, (select count(*) from Likes l where l.idReview = r.idReview) as likes
    from Review r left join User u on r.user = u.idUser where r.note = ?`;
    const results = await mysql.execute(query, [req.query.q]);
    if (results.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }
    return res.status(200).send({response: results});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const query = `select idReview, tittle, author, resume, review, note,photo,username, postDate, (select count(*) from Likes l where l.idReview = r.idReview) as likes
    from Review r left join User u on r.user = u.idUser where r.idReview = ?`;
    const result = await mysql.execute(query, [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }
    return res.status(200).send({response: result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};

exports.postReview = async (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken.split(' ');
  const decoded = jwt.verify(token[1], process.env.JWT_KEY);
  try {
    const query = `INSERT INTO Review (tittle, author, resume, note, review, photo, postDate, user) VALUES (?,?,?,?,?,?,?, ?)`;
    const result = await mysql.execute(query, [
      req.body.tittle,
      req.body.author,
      req.body.resume,
      req.body.note,
      req.body.review,
      req.body.photo,
      new Date(),
      decoded.idUser
    ]);
    return res.status(201).send({
      message: "Review cadastrada com sucesso",
      response: {
        idReview: result.insertId,
      },
    });
  } catch (error) {
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
    const query = `select idReview, tittle, author, resume, review, note,photo,username, postDate, (select count(*) from Likes l where l.idReview = r.idReview) as likes from Review r left join User u on r.user = u.idUser where LOWER(tittle) LIKE ? or LOWER(author) LIKE ?`;
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



exports.uploadBookCover = (req,res,next) => {
    
    const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = req.body.image.split(';')[0].split('/')[1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `lecteurs-book-cover-${uuid()}.${type}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    }
    s3.upload(params, (error, data) => {
      if (error) {
        res.status(500).send(error)
    }
    res.status(200).send(data)
    });
}

exports.likeReview = async (req,res,next) => {
  const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], process.env.JWT_KEY);
  try {
    const query = `INSERT INTO Likes (idUser,idReview) VALUES (?,?)`;
    await mysql.execute(query, [
      decoded.idUser,
      req.params.id,
    ]);
  } catch (error) {
    if(error.code === "ER_DUP_ENTRY"){
      const query = `DELETE FROM Likes WHERE IdUser = ? and IdReview = ?`
      await mysql.execute(query, [
        decoded.idUser,
        req.params.id,
      ])
    }else{
      return res.status(500).send({error: error});
    }
  }
  const queryLikes = `SELECT count(*) as likes FROM Likes where idReview = ?`
    const resultLike = await mysql.execute(queryLikes,[
      req.params.id
    ])
  return res.status(200).send(resultLike)
}
