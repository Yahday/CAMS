const express = require('express');
const CM = require('../models/CM');
const app = express();


app.post('/cm', (req, res) => {
    let body = req.body;
    let cm = new CM({
        name: body.name,
        ubicacion: body.ubicacion
    });

    cm.save((err, cmDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cmDB
        });
    });
});

app.get('/cm', (req, res) => {
    CM.find({ estado: true })
        .populate('codigoCentral')
        .populate('codigoArea')
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
});



app.put('/cm/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'ubicacion', 'codigoCentral', 'codigoActor']);
    CM.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, cmDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cmDB
        });

    });
});

app.delete('/cm/:id', (req, res) => {
    let id = req.params.id;
    CM.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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