const express = require('express');
const jwt = require('jsonwebtoken');
const rutasProtegidas = express.Router();
const app = express();


rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, process.env.SEED, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } 
    else {
      res.send({ 
        mensaje: 'Token inexistente' 
      });
    }
});

module.exports = {rutasProtegidas};