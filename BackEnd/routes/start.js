const express = require('express');
const { rutasProtegidas } = require('../middlewares/autentication');
const app = express();



app.get('/start', [rutasProtegidas], (req, res) => {
    res.send('<h1>START</h1>');
   });