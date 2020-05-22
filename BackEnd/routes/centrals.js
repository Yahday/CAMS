const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Central = require('../models/centrals');
const app = express();

app.get('/central', (req, res) => {

    Central.find({ estado: true })
        .exec((err, centrals) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.central);
            return res.status(200).json({
                ok: true,
                count: centrals.length,
                centrals
            });
        });
});

app.post('/central', (req, res) => {
    let body = req.body;
    let central = new Central({
        name: body.name,
        alias: body.alias,
        siglas: body.siglas,
        direccion: body.direccion,
        latitud: body.latitud,
        longitud: body.longitud,
        criticity: body.criticity,

    });

    central.save((err, centDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            centDB
        });
    });
});

app.put('/central/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'alias', 'siglas', 'direccion', 'latitud', 'longitud', 'criticity']);
    Central.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, centDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            centDB
        });

    });
});

app.delete('/central/:id', (req, res) => {
    let id = req.params.id;
    Central.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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