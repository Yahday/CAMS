const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/users');
const app = express();

app.get('/user', (req, res) => {

    User.find({ estado: true })
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

app.post('/user', (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        telefono: body.telefono,
        expediente: body.expediente,
        estado: body.estado
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
    let body = _.pick(req.body, ['name', 'email', 'password', 'telefono', 'expediente', 'estado']);
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
    User.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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