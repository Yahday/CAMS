const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//MODEL OF BD
const app = express();

app.get('/login', (req, res) => {
    res.send('<h1>LOGIN</h1>'); 
});

app.post('/login', (req, res) => {
    //falta busqueda en la bd para comprobar usuario y contraseña
    //Texto para test= INICIO //cambiar por datos de bd
    if(req.body.usuario === "Yahday" && req.body.contrasena === "Awad") {
        const payload = {
         check:  true
        };
    //Texto para test= FIN    
        const token = jwt.sign(payload, process.env.SEED, {
            expiresIn: 1440
        });

        res.json({
         mensaje: 'Autenticación correcta',
         token: token
        });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }    
}) 

module.exports = app;