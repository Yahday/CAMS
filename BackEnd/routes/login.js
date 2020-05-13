const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

app.get('/login', (req, res) => {
    res.send('<h1>LOGIN</h1>'); 
});

module.exports = app;