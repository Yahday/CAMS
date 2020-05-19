const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
//MODEL OF BD
const app = express();

app.get('/login', (req, res) => {
    res.send('<h1>LOGIN</h1>'); 
});

app.post('/login', (req, res) => { //async para db
    //falta busqueda en la bd para comprobar usuario y contraseña
    /*
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if (!user) return res.status(401).send("User do not exist");
    if (user.password !== password) return res.status(401).send("Wrong Password");
    */
    //cambiar por datos de bd
    //Texto para test= INICIO
    if(req.body.usuario === "Yahday" && req.body.contrasena === "Awad") {
        const payload = {
         check:  true,
         userId: req.body._id //user._id
        };
    //Texto para test= FIN    
        const token = jwt.sign(payload, process.env.SEED, {
            expiresIn: 1440
        });

        res.json({
         mensaje: 'Autenticación correcta',
         token: token,
         _id: payload.userId
        });
    } else {
      res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }    
}) 

module.exports = app;