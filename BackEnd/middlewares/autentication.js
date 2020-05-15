const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const rutasProtegidas = express.Router();
const app = express();

app.set('llave', config.llave);

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
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