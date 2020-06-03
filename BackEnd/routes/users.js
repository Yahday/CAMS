const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/users');
const app = express();
const fs = require('fs');

app.get('/user', (req, res) => {

    User.find({ Status: true })
        //.populate('id_actor')
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.user);
            return res.status(200).json({
                ok: true,
                count: users.length,
                users
            });
        });
});

app.post('/use', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        alias: body.alias,
        expediente: body.expediente,
        telefono: body.telefono,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    user.save((err, usrDB) => {
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
});

app.post('/userImg', (req, res) => {
    let body = req.body;
    var Img = req.body.base64Image.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile('imagenes/usuarios/' + body.alias + '.jpg', Img, 'base64', function(err) {
        console.log(err); // writes out file without error, but it's not a valid image
    });

    let urlImagen = '/imagenes/usuarios/' + body.alias + '.jpg';

    let user = new User({
        name: body.name,
        alias: body.alias,
        expediente: body.expediente,
        telefono: body.telefono,
        email: body.email,
        avatar: urlImagen,
        password: bcrypt.hashSync(body.password, 10),
    });

    user.save((err, usrDB) => {
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
});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'alias', 'expediente', 'telefono', 'email', 'password', 'Status']);
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;