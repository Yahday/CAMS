const express = require('express');
const Users = require('../models/users');
const getUsuario = express.Router();


getUsuario.use(async (req, res, next) => {
    const areas = []
    const userid = req.userId
    await Users.findById(userid, {password: 0})
    .populate('area', 'name')
    .exec((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            user.area.forEach(element => {
                const area = element.name
                areas.push(area)
            });
        }
        req.areas = areas
        req.user = user 
        next();
    })

    
});

module.exports = {getUsuario}; 