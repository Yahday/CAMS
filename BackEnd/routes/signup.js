const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const fs = require('fs');

const User = require('../models/users');
const CM = require('../models/CM');

const SignUpCtrl = {};

function uploadIMG (foto, user){
    var Img = foto.replace(/^data:image\/jpeg;base64,/, "");
    let fotografia =`./imagenes/user/${user}.jpg`;
    fs.writeFile(`./imagenes/user/${user}.jpg`, Img, 'base64', function(err) {
        if (err) {console.log(err)}// writes out file without error, but it's not a valid image         
    });
    return fotografia
}

SignUpCtrl.getCM = async (req, res) => {
    await CM.find({estado: true}, {codigoCentral: 0, codigoArea: 0, estado: 0})
        .exec((err, cms) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: cms.length,
                cms
            });
        });
};

SignUpCtrl.addUser = async (req, res) => {
    let body = req.body;
    let imgName = body.alias + body.expediente
    let fotografia = uploadIMG(body.avatar, imgName);
    let user = new User({
        name: body.name,
        alias: body.alias,
        expediente: body.expediente,
        telefono: body.telefono,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        avatar: fotografia,
        cm: {codigoCM: body.cm} 
    });

    await user.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
};

router.get('/signup', SignUpCtrl.getCM); //Obtener CMs para select 
router.post('/signup', SignUpCtrl.addUser); //Nuevo Usuario

module.exports = router;