const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Hallazgo = require('../models/hallazgos');
const app = express();

app.get('/hallazgo', (req, res) => {

    Hallazgo.find({ estado: true })
        .exec((err, hallazgos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.hallazgo);
            return res.status(200).json({
                ok: true,
                count: hallazgos.length,
                hallazgos
            });
        });
});

app.post('/hallazgo', (req, res) => {
    let body = req.body;
    let hallazgo = new Hallazgo({

        criticity: body.criticity,

    });

    hallazgo.save((err, haDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            haDB
        });
    });
});

app.put('/hallazgo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['', '', '', '', '', '', 'criticity']);
    Hallazgo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, haDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            haDB
        });

    });
});

app.delete('/hallazgo/:id', (req, res) => {
    let id = req.params.id;
    Hallazgo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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