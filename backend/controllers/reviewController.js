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
    const query = `select r.id as idReview, title, author, resume,coverUrl,username, review,u.id as idUser,note, createdDate, (select count(*) from Likes l where l.idReview = r.id) as likes
    from Review r left join User u on r.user = u.id order by r.id desc`;
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
    const query = `select r.id as idReview, title, author, resume,coverUrl,username, review,note,u.id as idUser, createdDate, (select count(*) from Likes l where l.idReview = r.id) as likes
    from Review r left join User u on r.user = u.id where r.note = ?`;
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
    const query = `select r.id as idReview, title, author, resume, review, note,coverUrl,username, u.id as idUser, createdDate, (select count(*) from Likes l where l.idReview = r.id) as likes
    from Review r left join User u on r.user = u.id where r.id = ?`;
    const result = await mysql.execute(query, [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).send({message: "Nenhum resultado encontrado"});
    }
    return res.status(200).send(result[0]);
  } catch (error) {
    return res.status(500).send({error: error});
  }
};


exports.postReview = async (req, res, next) => {
  const usertoken = req.headers.authorization;
  const token = usertoken
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  
  try {
    const query = `INSERT INTO Review (title, author, resume, note, review, coverUrl, createdDate, user) VALUES (?,?,?,?,?,?,?, ?)`;
    const result = await mysql.execute(query, [
      req.body.title,
      req.body.author,
      req.body.resume,
      req.body.note,
      req.body.review,
      req.body.coverUrl,
      new Date(),
      decoded.id
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
    const query = `UPDATE Review set title = ?, author = ?, resume = ?, note = ?, review = ?, coverUrl = ? WHERE id = ?`;
    await mysql.execute(query, [
      req.body.title,
      req.body.author,
      req.body.resume,
      req.body.note,
      req.body.review,
      req.body.coverUrl,
      req.params.id,
    ]);
    return res.status(200).send({
      message: "Review alterada com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
};

exports.searchReview = async (req, res, next) => {
  try {
    const query = `select r.id as idReview, title, author, resume, review, note,u.id as idUser,coverUrl,username, createdDate, (select count(*) from Likes l where l.idReview = r.id) as likes from Review r left join User u on r.user = u.id where LOWER(title) LIKE ? or LOWER(author) LIKE ?`;
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
    const token = usertoken
    const decoded = jwt.verify(token, process.env.JWT_KEY);
  try {
    const query = `INSERT INTO Likes (idUser,idReview) VALUES (?,?)`;
    await mysql.execute(query, [
      decoded.id,
      req.params.id,
    ]);
  } catch (error) {
    if(error.code === "ER_DUP_ENTRY"){
      const query = `DELETE FROM Likes WHERE IdUser = ? and IdReview = ?`
      await mysql.execute(query, [
        decoded.id,
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
  return res.status(200).send(resultLike[0])
}
