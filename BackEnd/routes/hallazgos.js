const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const Hallazgo = require('../models/hallazgos');


//Controller
const HallazgoCtrl = {};

HallazgoCtrl.getHallazgos = async(req, res) => {
    await Hallazgo.find({ estado: true })
        .exec((err, hallazgos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: hallazgos.length,
                hallazgos
            })
        })
};


router.get('/hallazgo/:estado', HallazgoCtrl.getHallazgos); //Ver hallazgos