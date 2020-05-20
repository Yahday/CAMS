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

    /*falta busqueda en la bd para comprobar usuario y contraseña
    const { email, password } = req.body;
    const user = await User.findOne({email: email});*/
    if (req.body.email !== "Yahday") return res.status(401).send("User do not exist");//(!user)
    if (req.body.password !== "Awad") return res.status(401).send("Wrong Password");//(user.password !== password)
    const payload = {
        check:  true,
        userId: req.body._id //user._id
       };
    const token = jwt.sign(payload, process.env.SEED, {
        expiresIn: 1440
    });

    res.json({
     mensaje: 'Autenticación correcta',
     token: token,
     _id: payload.userId
    });
}) 

module.exports = app;