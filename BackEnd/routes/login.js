// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/users');
// //MODEL OF BD
// const app = express();

// app.get('/login', (req, res) => {
//     res.send('<h1>LOGIN</h1>');
// });

// //ruta
// app.post('/login', async(req, res) => {

//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(401).send("User do not exist");
//     if (user.password !== password) return res.status(401).send("Wrong Password");
//     const payload = {
//         check: true,
//         userId: user._id
//     };
//     const token = jwt.sign(payload, process.env.SEED, {
//         expiresIn: 1440
//     });

//     res.json({
//         mensaje: 'Autenticación correcta',
//         token: token,
//         _id: payload.userId
//     });
// })

// module.exports = app;