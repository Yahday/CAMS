const { Router } = require('express');
const _ = require('underscore');
const router = Router();

const CM = require('../models/CM');
const Areas = require('../models/areas');
const Activities = require('../models/activities');

//Controller
const AreaCtrl = {};

AreaCtrl.getAreas = async (req, res) => { //Ver todas las Areas
    await CM.find({name: req.user.cm}, {name: 0, ubicacion: 0, codigoCentral: 0, estado: 0})
        .populate({path: 'codigoArea', populate: {path: 'activities'}})
        .exec((err, areas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                Area: areas
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

AreaCtrl.addActivity = async (req, res) => { //Agregar Actividad
    const id = req.params.id;
    const name = req.body.name;
    await Activities.findOne({name: name}) //Busca la Actividad que se va a agregar al Area
        .exec(async (err, actividad) => {
            console.log(actividad);
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            } else {
                await Areas.findByIdAndUpdate(id, {$push: {activities: actividad}}); //Agrega la Actividad buscada en el 
                return res.status(200).json({                                        //Array de Actividades del Area
                    ok: true,
                    message: `Actividad ${name} agregada`
                })
            }
        })
};

AreaCtrl.deleteActivity = async (req, res) => { //Quitar Actividad
    const id = req.params.activity; //Id de la Actividad a Quitar del Area
    const id_area = req.params.id; //Id del Area a modificar
    Areas.findByIdAndUpdate(id_area, {$pull: {activities: id}}) //Quita la Actividad del Area
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

//Sub-routes
router.get('/area', AreaCtrl.getAreas);//Ver todas las Areas
router.post('/area', AreaCtrl.createArea);//Nuevo Area

router.get('/area/:id', AreaCtrl.getArea);//Buscar un Area
router.put('/area/:id', AreaCtrl.editArea);//Editar Nombre del Area
router.delete('/area/:id', AreaCtrl.deleteArea);//Eliminar Area

router.post('/area/:id/activities', AreaCtrl.addActivity);//Agregar Actividad

router.delete('/area/:id/activities/:activity', AreaCtrl.deleteActivity);//Quitar Actividad

module.exports = router;