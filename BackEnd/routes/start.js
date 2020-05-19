const express = require('express');
const { rutasProtegidas } = require('../middlewares/autentication');
const app = express();



app.get('/start', [rutasProtegidas], (req, res) => {
    res.send(req.userId);
});

module.exports = app;