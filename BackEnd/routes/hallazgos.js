const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const Hallazgo = require('../models/hallazgos');


//Controller
const HallazgoCtrl = {};

HallazgoCtrl.getHallazgos = async(req, res) => {
    await Hallazgo.find()
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

HallazgoCtrl.getHallazgo = async(req, res) => { //Buscar 
    const id = req.params.id;
    await Hallazgo.findById(id)
        .exec((err, hallazgo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                hallazgo
            })
        });
};

HallazgoCtrl.createHallazgo = async(req, res) => { //Nueva 
    const name = req.body.name;
    const newHallazgo = new Hallazgo({ name: name });
    await newHallazgo.save((err, hallazgo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Hallazgo ${hallazgo.name} guardada`
        })
    });
};

HallazgoCtrl.deleteHallazgo = async(req, res) => { //Eliminar
    const id = req.params.id;
    await Hallazgo.findByIdAndDelete(id)
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Hallazgo eliminado`
                });
            }
        });
};

HallazgoCtrl.editHallazgo = async(req, res) => { //Editar Nombrel hallazgo
    const id = req.params.id;
    const name = req.body.name;
    await Hallazgo.findByIdAndUpdate(id, { name: name })
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Hallazgo ${name} actualizada`
                })
            }
        })
};

HallazgoCtrl.getActivities = async(req, res) => {
    const id = req.params.id;
    await Hallazgo.findById(id)
        .exec((err, hallazgo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                Hallazgo: hallazgo.name,
                Actividades: hallazgo.activities
            });
        });
};

HallazgoCtrl.addActivity = async(req, res) => {
    const id = req.params.id;
    const activity = req.body.activity;
    const tasks = req.body.tasks;
    const img_hall = req.body.img_hall;
    const img_liq = req.body.img_liq;
    const newActivity = { activity: activity, tasks: tasks, img_hall: img_hall, img_liq: img_liq }; //"Nueva"
    await Hallazgo.findByIdAndUpdate(id, { $push: { activities: newActivity } })
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Tarea ${activity} agregada`
                })
            }
        })
};

HallazgoCtrl.editActivity = async(req, res) => { //Editar (se maneja como sustitucion)
    const id = req.params.id;
    const oldActivity = req.body.old;
    const activity = req.body.activity;
    const tasks = req.body.tasks;
    const img_hall = req.body.img_hall;
    const img_liq = req.body.img_liq;
    const newActivity = { activity: activity, tasks: tasks, img_hall: img_hall, img_liq: img_liq };
    try {
        await Hallazgo.findByIdAndUpdate(id, { $pull: { activities: { name: oldActivity } } }) //Elimina "a sustituir"
        await Hallazgo.findByIdAndUpdate(id, { $push: { activities: newActivity } }) //Agrega " Actualizada"
        return res.status(200).json({
            ok: true,
            message: `Tarea ${activity} modificada`
        })
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
};

HallazgoCtrl.deleteActivity = async(req, res) => { //Eliminar 
    const id = req.params.id;
    const activity = req.params.activity
    await Hallazgo.findByIdAndUpdate(id, { $pull: { activities: { activity: activity } } }, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            return res.status(200).json({
                ok: true,
                message: `Actividad eliminada`
            })
        }
    });
};

//Sub-routes
router.get('/hallazgo', HallazgoCtrl.getHallazgos); //Ver Actividades
router.post('/hallazgo', HallazgoCtrl.createHallazgo); //Nueva Actividad

router.get('/hallazgo/:id', HallazgoCtrl.getHallazgo); //Ver una Actividad
router.put('/hallazgo/:id', HallazgoCtrl.editHallazgo); //Editar Nombre de la Actividad
router.delete('/hallazgo/:id', HallazgoCtrl.deleteHallazgo); //Eliminar Actividad

router.get('/hallazgo/:id/activities', HallazgoCtrl.getActivities); //Ver Tareas de una Actividad
router.post('/hallazgo/:id/activities', HallazgoCtrl.addActivity); //Nueva Tarea

router.put('/hallazgo/:id/activities/:activity', HallazgoCtrl.editActivity); //Editar Tarea
router.delete('/hallazgo/:id/activities/:activity', HallazgoCtrl.deleteActivity); //Eliminar Tarea

module.exports = router;