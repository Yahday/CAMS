const express = require('express');
const { rutasProtegidas } = require('../middlewares/autentication');
const { getUsuario } = require('../middlewares/getuser');
const app = express();



app.get('/start', [rutasProtegidas, getUsuario], (req, res) => {
    const user = req.user
    res.json({usuario: user})
});

module.exports = app;