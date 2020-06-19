const express = require('express');
const Users = require('../models/users');
const getUsuario = express.Router();


getUsuario.use(async (req, res, next) => {  //Funcion Middleware: Tomar el id de Usuario guardado en el Token para 
    const areas = []                                           // buscarlo en la base de datos y mandar los datos
    const cms = []                                             // separados por medio de un objeto almacenado en req.user
    const userid = req.userId
    await Users.findById(userid, {password: 0})
    .populate('area.codigoArea', 'name')
    .populate('cm.codigoCM', 'name')
    .exec((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } 
        
        if (user.Status == true) {
            user.area.forEach(element => {
                const area = element.codigoArea.name
                areas.push(area)
            });
            user.cm.forEach(element => {
                const cm = element.codigoCM.name
                cms.push(cm)
            });
        } else {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.user = {
            areas: areas,
            cm: cms,
            name: user.name,
            alias: user.alias
        }
        next();
    })

    
});

module.exports = {getUsuario}; 