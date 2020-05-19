const express = require('express');
const jwt = require('jsonwebtoken');
const rutasProtegidas = express.Router();
const app = express();


rutasProtegidas.use((req, res, next) => {
  const token = req.headers.access;

  if (!token) {
    return res.status(401).send('Unathorize Request');
  }

  if (token === 'null') {
    return res.status(401).send('Unathorize Request');
  }

  jwt.verify(token, process.env.SEED, (err) => {      
    if (err) {
      return res.json({ mensaje: 'Token inválida' });    
    }
    });
  const payload = jwt.verify(token, process.env.SEED);  
  req.userId = payload.userId
  next();
});

module.exports = {rutasProtegidas}; 