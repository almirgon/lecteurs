const mysql = require("../mysql");
const bcrypt = require("bcrypt");


exports.createUser = async (req, res, next) => {
  try {
    const query = `INSERT INTO User (firstName, lastName, username, email, password) VALUES (?,?,?,?,?)`;
    const queryEmail = "SELECT * FROM User WHERE email = ?";
    const queryUsername = "SELECT * FROM User WHERE username = ?";

    const resultsEmail = await mysql.execute(queryEmail, [req.body.email]);
    if (resultsEmail.length > 0) {
      return res.status(409).send({message: "Email já existe"});
    }
    const resultsUsername = await mysql.execute(queryUsername, [
      req.body.username,
    ]);
    if (resultsUsername.length > 0) {
      return res.status(409).send({message: "Username já existe"});
    }

    const results = await mysql.execute(query, [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.email,
      bcrypt.hashSync(req.body.password, 10),
    ]);

    return res.status(201).send({
      message: "Usuário criado com sucesso",
      response: {
        user: {
          id_user: results.insertId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
      },
    });
  } catch (error) {
    return res.status(500).send({error: error});
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const query = `UPDATE User set firstName = ?, lastName = ?, username = ?, email = ?, password = ? WHERE idUser = ?`;
    await mysql.execute(query, [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.email,
      req.body.password,
      req.params.id,
    ]);
    return res.status(201).send({
      mensagem: "Dados do Usuário alterados com sucesso",
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const query = `DELETE FROM User WHERE idUser = ?`;
    await mysql.execute(query, [req.params.id]);
    return res.status(202).send({message: "Usuário excluído com sucesso"});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};

exports.getUser = async (req, res, next) => {
 
  try {
    const query = `SELECT idUser,firstName,lastName,username,email FROM User WHERE idUser = ?`;
    const result = await mysql.execute(query, [req.params.id]);
    if (result.length === 0) {
      return res.status(404).send({message: "Nenhum usuário encontrado"});
    }
    return res.status(200).send({response: result});
  } catch (error) {
    return res.status(500).send({error: error});
  }
};
