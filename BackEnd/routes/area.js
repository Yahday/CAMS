const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const Areas = require('../models/areas');
const Activities = require('../models/activities');

//Controller
const AreaCtrl = {};

AreaCtrl.getAreas = async (req, res) => { //Ver todas las Areas
    await Areas.find()
        .exec((err, areas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: areas.length,
                areas
            })
        })
};

AreaCtrl.getArea = async (req, res) => { //Buscar un Area
    const id = req.params.id;
    await Areas.findById(id)
        .populate('activities')
        .exec((err, area) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                area
            })
        });
};

AreaCtrl.createArea = async (req, res) => { //Nueva area
    const name = req.body.name;
    const newArea = new Areas({name: name});
    await newArea.save((err, area) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            message: `Area ${area.name} guardada`
        })
    });
};

AreaCtrl.deleteArea = async (req, res) => { //Eliminar Area
    const id = req.params.id;
    await Areas.findByIdAndDelete(id)
        .exec ((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({ 
                    ok: true,
                    message: `Area eliminada`
                });
            }
        });
};

AreaCtrl.editArea = async (req, res) => { //Editar Nombre de la Area
    const id = req.params.id;                               
    const name = req.body.name;
    await Areas.findByIdAndUpdate(id, {name: name})
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Area ${name} actualizada`
                })
            }    
        })    
};

AreaCtrl.getActivities = async (req, res) => { //Ver Actividades de un Area
    const id = req.params.id;
    await Areas.findById(id)
    .populate('activities')
    .exec((err, area) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            Area: area.name,
            Actividades: area.activities
        });
    });
};

AreaCtrl.addActivity = async (req, res) => { //Agregar Actividad
    const id = req.params.id;
    const name = req.body.name;
    await Activities.findOne({name: name})
        .exec(async (err, actividad) => {
            console.log(actividad);
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                await Areas.findByIdAndUpdate(id, {$push: {activities: actividad}});
                return res.status(200).json({
                    ok: true,
                    message: `Actividad ${name} agregada`
                })
            }
        })
};

AreaCtrl.deleteActivity = async (req, res) => { //Quitar Actividad
    const id = req.params.activity;
    const id_act = req.params.id;
    Areas.findByIdAndUpdate(id_act, {$pull: {activities: id}})
        .exec((err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    message: `Actividad eliminada de esta área`
                })
            }  
        }) 
};

AreaCtrl.getTasks = async (req, res) => { //Ver Tareas de una Actividad
    const id = req.params.activity;
    await Activities.findById(id)
    .populate('tasks')
    .exec((err, activity) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            Tareas: activity.tasks
        });
    });
};

//Sub-routes
router.get('/area', AreaCtrl.getAreas);//Ver todas las Areas
router.post('/area', AreaCtrl.createArea);//Nuevo Area

router.get('/area/:id', AreaCtrl.getArea);//Buscar un Area
router.put('/area/:id', AreaCtrl.editArea);//Editar Nombre del Area
router.delete('/area/:id', AreaCtrl.deleteArea);//Eliminar Area

router.get('/area/:id/activities', AreaCtrl.getActivities);//Ver Actividades de un Area
router.post('/area/:id/activities', AreaCtrl.addActivity);//Agregar Actividad

router.delete('/area/:id/activities/:activity', AreaCtrl.deleteActivity);//Quitar Actividad
router.get('/area/:id/activities/:activity', AreaCtrl.getTasks);//Ver Tareas de una Actividad

module.exports = router;