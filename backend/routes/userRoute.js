const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const protectedRoute = require('../middleware/protectedRoute')

router.get('/all', protectedRoute, (req,res,next) => {
  mysql.getConnection((error,conn) => {
    conn.query('SELECT * FROM User', 
    (error,result,fields) => {
      if(error) { return res.status(500).send({error:error})}
      return res.status(200).send({response: result})
    })
  })
})

router.get('/:id', (req,res,next) => {
  mysql.getConnection((error,conn) => {
    conn.query('SELECT * FROM User WHERE idUser = ?',
    [req.params.id], 
    (error,result,fields) => {
      if(error) { return res.status(500).send({error:error})}
      if(result.length === 0){return res.status(404).send({message: "Usuário não encontrado"})}
      return res.status(200).send({response: result})
    })
  })
})

router.post('/', (req,res,next) => {
  mysql.getConnection((error,conn) => {
    if(error){return res.status(500).send({
      error: error
    })}
    conn.query('SELECT * FROM User WHERE email = ?', [req.body.email], (error,results) => {
      if(error){return res.status(500).send({
        error: error
      })}
      if(results.length > 0){
        res.status(409).send({message: 'Email já existe'})
      }
    })
    conn.query('SELECT * FROM User WHERE username = ?', [req.body.username], (error,results) => {
      if(error){return res.status(500).send({
        error: error
      })}
      if(results.length > 0){
        res.status(409).send({message: 'Username já existe'})
      }
    })
    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
      if(errBcrypt){return res.status(500).send({error: errBcrypt})}
      conn.query('INSERT INTO User (firstName, lastName, username, email, password) VALUES (?,?,?,?,?)',
      [req.body.firstName,req.body.lastName,req.body.username,req.body.email,hash],
      (error,result,field) => {
        conn.release();
        if(error){return res.status(500).send({
          error: error
        })}
        res.status(201).send({
          message: "Usuário criado com sucesso",
          response: {
            user:{
              id_user: result.insertId, 
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email
            }
          },
          
          
        })
      })
    })
    
  })
})

router.put('/:id', (req,res,next) => {
  mysql.getConnection((error,conn) => {
    conn.query('UPDATE User set firstName = ?, lastName = ?, username = ?, email = ?, password = ? WHERE idUser = ?',
    [req.body.firstName,req.body.lastName,req.body.username,req.body.email,req.body.password, req.params.id],
    (error,result,field) => {
      conn.release();
      if(error){return res.status(500).send({
        error: error
      })}

      res.status(201).send({
        mensagem: "Dados do Usuário alterados com sucesso",
      })
    })
  })
})

router.delete('/:id', (req,res,next) => {
  mysql.getConnection((error,conn) => {
    conn.query('DELETE FROM User WHERE idUser = ?',
    [req.params.id], 
    (error,result,fields) => {
      if(error) { return res.status(500).send({error:error})}
      return res.status(202).send({message: "Usuário excluído com sucesso"})
    })
  })
})

router.post('/login', (req,res,next) => {
  mysql.getConnection((error,conn) => {
    if(error){return res.status(500).send({error:error})}
    const query = `SELECT * FROM User WHERE email = ?`
    conn.query(query,[req.body.email], (error,results,fields) => {
      conn.release()
      if(error){return res.status(500).send({error:error})}
      if(results.length < 1){return res.status(401).send({message: 'Falha na autenticação'})}
      bcrypt.compare(req.body.password, results[0].password, (err,result) => {
        if(err){return res.status(401).send({message: 'Falha na autenticação'})}
        if(result){
          const token = jwt.sign({
            idUser: results[0].idUser,
            email: results[0].email
          }, process.env.JWT_KEY, {
            expiresIn: '2H'
          })
          return res.status(200).send({message: 'Autenticado com sucesso', token: token})
        }
        return res.status(401).send({message: 'Falha na autenticação'})
      })


    })
  })
})

module.exports = router