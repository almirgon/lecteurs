const mysql = require("../mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const query = `SELECT * FROM User WHERE email = ? OR username = ?`;
    const results = await mysql.execute(query, [
      req.body.login,
      req.body.login,
    ]);
    if (results.length < 1) {
      console.log(results)
      return res.status(401).send({message: "Usuário não encontrado"});
    }
    if (await bcrypt.compare(req.body.password, results[0].password)) {
      const token = jwt.sign(
        {
          id: results[0].id,
          email: results[0].email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "2H",
        },
      );
      return res
        .status(200)
        .send({
          message: "Autenticado com sucesso",
          id: results[0].id,
          username: results[0].username,
          token: token,
        });
    }
    return res.status(401).send({message: "Falha na autenticação"});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};
