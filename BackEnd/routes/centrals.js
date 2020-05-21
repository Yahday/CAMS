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
        neighborhood: body.neighborhood,
        between_streets: body.between_streets,
        street: body.street,
        outdoor_number: body.outdoor_number,
        interior_number: body.interior_number,
        latitud: body.latitud,
        cp: body.cp,
        longitud: body.longitud,
        criticity: body.criticity,
        class: body.class,
        acronym: body.acronym,
        created_at: body.created_at,
        updated_at: body.updated_at
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
    let body = _.pick(req.body, ['name', 'alias', 'neighborhood', 'between_streets', 'street', 'outdoor_number', 'interior_number', 'latitud', ' cp', 'longitud', 'criticity', 'class', 'acronym', 'created_at', 'updated_at']);
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