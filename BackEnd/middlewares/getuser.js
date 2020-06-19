const express = require('express');
const Users = require('../models/users');
const getUsuario = express.Router();


getUsuario.use(async (req, res, next) => {
 
    const userid = req.userId
    await Users.findById(userid, {password: 0}).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        req.user = user   
        next();
    })

    
});

module.exports = {getUsuario}; 